import React, { ReactNode, useCallback, useEffect } from 'react'
import { Breadcrumbs, Container } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import { getRequestPath, RoutePath } from '@staff-portal/routes'
import { ItemsList, NoSearchResultsMessage } from '@staff-portal/ui'
import { Filters, Pagination } from '@staff-portal/filters'
import { ContentWrapper } from '@staff-portal/page-wrapper'
import {
  TalentListSkeletonLoader,
  JobCandidateTalentListItemFragment,
  TalentListSearchBar,
  checkBestMatchQueryEnabled
} from '@staff-portal/talents-list'
import { hasTypeName } from '@staff-portal/talents-gigs'
import { useAnalytics } from '@staff-portal/monitoring-service'
import { GigSegmentEvents } from '@staff-portal/facilities'
import { useGetUserVerticals } from '@staff-portal/verticals'

import useFiltersConfig from './services/use-filters-config/use-filters-config'
import CandidateListItem from './containers/CandidateListItem/CandidateListItem'
import { GigCandidatesContext } from './contexts/gig-candidates-context'
import useHandleTalentListFilters from './services/use-handle-talent-list-filters/use-handle-talent-list-filters'
import useGetTalentsForCandidateList from './services/use-get-talents-for-candidate-list/use-get-talents-for-candidate-list'
import SkillsFilter from './components/SkillsFilter/SkillsFilter'
import { PAGE_SIZES } from './constants'
import * as S from './styles'
import { useGetRequestForCandidateList } from './data/get-request-for-candidate-list/get-request-for-candidate-list.staff.gql'

const NO_RESULTS_MESSAGE = 'There are no talents for this search criteria'

const searchBarWithNestedControls = (nestableControls: ReactNode) => (
  <TalentListSearchBar nestableControls={nestableControls} />
)

interface TalentListItemData {
  talentId: string
  jobCandidate?: JobCandidateTalentListItemFragment
}

const getItemKey = ({ talentId }: TalentListItemData) => talentId

const GigCandidatesSearch = () => {
  const analytics = useAnalytics()

  const {
    page,
    filterValues,
    sortOptions,
    selectedSkills,
    resolvingFilters,
    handlePageChange,
    handleFilterChange,
    handleSkillSelect,
    handleSkillDeselect
  } = useHandleTalentListFilters()

  const { request_id: requestId } = filterValues as typeof filterValues & {
    request_id: string
  }

  const { request, loading: requestLoading } = useGetRequestForCandidateList(
    {
      id: requestId
    },
    !requestId
  )

  const { data: verticals, initialLoading: verticalsLoading } =
    useGetUserVerticals()

  const {
    talents,
    totalCount,
    loading: talentsLoading
  } = useGetTalentsForCandidateList({
    filterValues,
    page,
    verticals,
    skip: resolvingFilters || !requestId
  })

  const loading =
    resolvingFilters || requestLoading || talentsLoading || verticalsLoading

  const { filtersConfig } = useFiltersConfig()

  const isBestMatchQueryEnabled = checkBestMatchQueryEnabled(filterValues)

  const sendAnalytics = useCallback(
    analytic => {
      analytics.track(GigSegmentEvents.GigCandidatesSearchPerformed, analytic)
    },
    [analytics]
  )

  useEffect(() => {
    if (!requestId || !request || loading) {
      return
    }

    const analytic = {
      gigId: requestId,
      gigType: hasTypeName(request) && request.__typename,
      searchQuery: {
        page,
        filterValues,
        selectedSkills
      },
      searchResults: {
        talents: talents?.map(({ talentId }) => talentId),
        totalCount
      }
    } as const

    sendAnalytics(analytic)
  }, [
    analytics,
    filterValues,
    page,
    request,
    selectedSkills,
    loading,
    talents,
    totalCount,
    requestId,
    sendAnalytics
  ])

  return (
    <GigCandidatesContext.Provider value={{ selectedSkills }}>
      <Container top='small'>
        <Breadcrumbs>
          <Breadcrumbs.Item as={Link} href={RoutePath.Requests} active={false}>
            Toptal Publications
          </Breadcrumbs.Item>
          {requestId && request && (
            // eslint-disable-next-line @toptal/davinci/no-as-prop-for-css-styled-components
            <Breadcrumbs.Item
              forwardedAs={Link}
              href={getRequestPath(requestId)}
              active={false}
              css={S.breadcrumbItem}
            >
              {request?.title}
            </Breadcrumbs.Item>
          )}
        </Breadcrumbs>
        <ContentWrapper
          title='Search Candidates'
          itemsCount={totalCount}
          prependContent={
            request && (
              <SkillsFilter
                description={request.description}
                skills={request?.skills}
                selectedSkills={selectedSkills}
                onSkillSelect={handleSkillSelect}
                onSkillDeselect={handleSkillDeselect}
              />
            )
          }
        >
          <Filters
            values={filterValues}
            config={filtersConfig}
            onChange={handleFilterChange}
            sortOptions={sortOptions}
            limitOptions={PAGE_SIZES}
          >
            {searchBarWithNestedControls}
          </Filters>

          <Container top='large' bottom='large'>
            {loading ? (
              <TalentListSkeletonLoader />
            ) : (
              <ItemsList<TalentListItemData>
                data={talents}
                itemWithoutSection
                renderItem={({ talentId }, index) => (
                  <CandidateListItem
                    talentId={talentId}
                    request={request}
                    isBestMatchQueryEnabled={isBestMatchQueryEnabled}
                    talentIndex={index}
                  />
                )}
                getItemKey={getItemKey}
                notFoundMessage={
                  <NoSearchResultsMessage message={NO_RESULTS_MESSAGE} />
                }
              />
            )}
          </Container>

          <Pagination
            activePage={page}
            onPageChange={handlePageChange}
            limit={filterValues.limit}
            itemCount={totalCount}
          />
        </ContentWrapper>
      </Container>
    </GigCandidatesContext.Provider>
  )
}

export default GigCandidatesSearch
