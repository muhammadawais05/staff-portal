import React, { useMemo } from 'react'
import { Button, Container } from '@toptal/picasso'
import { ItemsList, NoSearchResultsMessage } from '@staff-portal/ui'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import {
  badgesToGql,
  createInputCategory,
  Filters,
  LogicOperator,
  Pagination,
  SearchBar
} from '@staff-portal/filters'
import { RouterLink } from '@staff-portal/navigation'
import { getSortCommunityLeadersPath } from '@staff-portal/routes'
import { ContentWrapper } from '@staff-portal/page-wrapper'
import {
  CommunityLeaderListSkeletonLoader,
  CommunityLeader,
  CommunityLeaderListItem,
  CommunityLeaderApplicant,
  PAGE_SIZES,
  REFRESH_COMMUNITY_LEADER_LIST,
  useCommunityLeadersFilterOptions,
  useCommunityLeadersFiltersConfig,
  useGetCommunityLeadersAccount
} from '@staff-portal/community-leaders'
import {
  CommunityLeaderAccountBadgesFilter,
  CommunityLeaderStatus
} from '@staff-portal/graphql/staff'

import * as S from './styles'

const NO_RESULTS_MESSAGE =
  'There are no community leaders for this search criteria'

const CommunityLeaders = () => {
  const {
    pagination,
    filterValues,
    page,
    limit,
    handlePageChange,
    handleFilterChange
  } = useCommunityLeadersFilterOptions()

  const { filtersConfig } = useCommunityLeadersFiltersConfig()
  const gqlFilterVariables = useMemo(
    () => ({
      ...filterValues,
      ...(filterValues.badges
        ? {
            badges: badgesToGql<CommunityLeaderAccountBadgesFilter>(
              filterValues.badges as unknown[][],
              filterValues.logic as LogicOperator
            )
          }
        : {}),
      type: filterValues.type?.length === 1 ? filterValues.type[0] : undefined,
      logic: undefined
    }),
    [filterValues]
  )
  const {
    data = [],
    totalCount = 0,
    loading,
    refetch
  } = useGetCommunityLeadersAccount({
    filter: gqlFilterVariables,
    pagination
  })

  const filterValuesWithLimit = useMemo(
    () => ({ ...filterValues, limit }),
    [filterValues, limit]
  )
  const handleListChange = () => {
    const totalPages = Math.ceil(totalCount / limit)

    const isInLastPage = totalPages - 1 === page
    const lastPageContainsOneItem = totalCount % limit === 1

    if (isInLastPage && lastPageContainsOneItem && page > 0) {
      return handlePageChange(page - 1)
    }

    refetch()
  }

  useMessageListener(REFRESH_COMMUNITY_LEADER_LIST, refetch)

  return (
    <ContentWrapper
      title='Community Leaders'
      itemsCount={totalCount === 0 ? undefined : totalCount}
      actions={
        <RouterLink css={S.noUnderline} to={getSortCommunityLeadersPath()}>
          <Button size='small'>Sort Featured Leaders</Button>
        </RouterLink>
      }
    >
      <Filters
        values={filterValuesWithLimit}
        onChange={handleFilterChange}
        config={filtersConfig}
        limitOptions={PAGE_SIZES}
      >
        {nestableControls => (
          <SearchBar
            name='badges'
            categories={[createInputCategory({ name: 'names' })]}
            nestableControls={nestableControls}
          />
        )}
      </Filters>
      <Container top='large' bottom='large'>
        {loading ? (
          <CommunityLeaderListSkeletonLoader />
        ) : (
          <ItemsList<CommunityLeader>
            data={data}
            itemWithoutSection
            containerVariant='transparent'
            renderItem={communityLeader =>
              communityLeader.status === CommunityLeaderStatus.APPLIED ? (
                <CommunityLeaderApplicant
                  communityLeader={communityLeader}
                  onListChange={handleListChange}
                />
              ) : (
                <CommunityLeaderListItem
                  communityLeader={communityLeader}
                  onListChange={handleListChange}
                />
              )
            }
            getItemKey={communityLeader => communityLeader.id}
            notFoundMessage={
              <NoSearchResultsMessage message={NO_RESULTS_MESSAGE} />
            }
          />
        )}
      </Container>

      {!loading && data.length > 0 && (
        <Pagination
          itemCount={totalCount}
          limit={limit}
          activePage={page}
          onPageChange={handlePageChange}
        />
      )}
    </ContentWrapper>
  )
}

CommunityLeaders.displayName = 'CommunityLeaders'

export default CommunityLeaders
