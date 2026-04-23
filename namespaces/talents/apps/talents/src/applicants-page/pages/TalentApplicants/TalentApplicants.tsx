import React, { useMemo } from 'react'
import { Container } from '@toptal/picasso'
import ContentWrapper from '@staff-portal/page-wrapper'
import { Pagination, Filters } from '@staff-portal/filters'
import { useGetUserVerticals } from '@staff-portal/verticals'
import { ItemsList, NoSearchResultsMessage } from '@staff-portal/ui'
import { useTouchCounter, CounterName } from '@staff-portal/counters'
import {
  getGqlJobId,
  JobSkillsFilter,
  PAGE_SIZES
} from '@staff-portal/talents-list'
import { ApplicantSkillRating } from '@staff-portal/graphql/staff'

import { useGetTalentApplicantsList } from '../../data'
import { useHandleTalentApplicantsFilters, useFiltersConfig } from '../../hooks'
import { TalentApplicantListSkeletonLoader } from '../../components'
import { renderItem, getItemKey, getTalentApplicantsSearch } from './utils'

const NO_RESULTS_MESSAGE = 'There is no talent for this search criteria.'

const TalentApplicants = () => {
  const {
    page,
    pagination,
    limit,
    handlePageChange,
    filterValues,
    handleFilterChange,
    sortOptions
  } = useHandleTalentApplicantsFilters()

  const skipLoadingVerticals = !filterValues.roles
  const { data: verticals, initialLoading: verticalsLoading } =
    useGetUserVerticals({ skip: skipLoadingVerticals })

  const { loading, talentApplicants, totalCount } = useGetTalentApplicantsList({
    filterValues,
    pagination,
    verticals,
    skip: verticalsLoading
  })

  const jobId = useMemo(
    () => getGqlJobId(filterValues.job_id),
    [filterValues.job_id]
  )
  const { filtersConfig } = useFiltersConfig()

  useTouchCounter({
    counterName: CounterName.TalentApplicants
  })

  const filterValuesWithLimit = useMemo(
    () => ({ ...filterValues, limit }),
    [filterValues, limit]
  )

  return (
    <ContentWrapper
      title='Talent Applicants'
      itemsCount={totalCount}
      itemsCountLoading={loading}
      prependContent={
        jobId && (
          <JobSkillsFilter
            jobId={jobId}
            ratingOverride={ApplicantSkillRating.APPLICANT}
            filterValues={filterValues}
            handleFilterChange={handleFilterChange}
          />
        )
      }
    >
      <Filters
        values={filterValuesWithLimit}
        config={filtersConfig}
        onChange={handleFilterChange}
        sortOptions={sortOptions}
        limitOptions={PAGE_SIZES}
      >
        {getTalentApplicantsSearch}
      </Filters>
      <Container top='large' bottom='large'>
        {loading ? (
          <TalentApplicantListSkeletonLoader />
        ) : (
          <ItemsList<{ id: string }>
            data={talentApplicants}
            itemWithoutSection
            renderItem={renderItem}
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
        limit={limit}
        itemCount={totalCount}
      />
    </ContentWrapper>
  )
}

export default TalentApplicants
