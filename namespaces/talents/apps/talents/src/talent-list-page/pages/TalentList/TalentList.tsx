import React, { ReactNode, useCallback } from 'react'
import { Container } from '@toptal/picasso'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { ItemsList, NoSearchResultsMessage } from '@staff-portal/ui'
import { JOB_UPDATED, JobMaxHourlyRateWidgets } from '@staff-portal/jobs'
import { Filters, Pagination, FilterConfig } from '@staff-portal/filters'
import { ContentWrapper } from '@staff-portal/page-wrapper'
import {
  TalentListSkeletonLoader,
  JobCandidateTalentListItemFragment,
  useFiltersConfig,
  TalentListSearchBar,
  TalentListItem,
  PAGE_SIZES,
  checkBestMatchQueryEnabled,
  JobSkillsFilter
} from '@staff-portal/talents-list'

import { TalentListActions } from '../../components'
import useGetTalentsForTalentList from '../../hooks/use-get-talents-for-talent-list'
import useHandleTalentListFilters from '../../hooks/use-handle-talent-list-filters'

const NO_RESULTS_MESSAGE = 'There are no talents for this search criteria'

const searchBarWithNestedControls = (nestableControls: ReactNode) => (
  <TalentListSearchBar nestableControls={nestableControls} />
)

interface TalentListItemData {
  talentId: string
  jobCandidate?: JobCandidateTalentListItemFragment
}

const getItemKey = ({ talentId }: TalentListItemData) => talentId

type HourlyRateRange = { from?: number; to?: number }
export const TalentList = () => {
  const {
    page,
    filterValues,
    sortOptions,
    resolvingFilters,
    handlePageChange,
    handleFilterChange
  } = useHandleTalentListFilters({})

  const { talents, totalCount, loading, jobData, jobId, refetchJobCandidates } =
    useGetTalentsForTalentList({
      filterValues,
      page,
      resolvingFilters
    })

  const talentsData = talents

  const { filtersConfig: originalFiltersConfig } = useFiltersConfig(jobId)

  const renderMaxHourlyRate = useCallback(
    (item: ReactNode) => {
      return (
        <JobMaxHourlyRateWidgets
          expanded={true}
          maxHourlyRate={{
            from: (filterValues.client_hourly_rate as HourlyRateRange)?.from,
            to: (filterValues.client_hourly_rate as HourlyRateRange)?.to
          }}
          jobCommitment={jobData?.commitment?.toUpperCase() ?? ''}
          verticalId={jobData?.vertical?.id}
          skillSets={jobData?.skillSets?.nodes ?? []}
          growField
        >
          {item}
        </JobMaxHourlyRateWidgets>
      )
    },
    [
      filterValues.client_hourly_rate,
      jobData?.commitment,
      jobData?.skillSets?.nodes,
      jobData?.vertical?.id
    ]
  )

  const filtersConfig = originalFiltersConfig.map(filter => {
    return (filter as FilterConfig).name === 'client_hourly_rate'
      ? { ...filter, render: renderMaxHourlyRate }
      : filter
  })

  useMessageListener(
    JOB_UPDATED,
    ({ jobId: id }) =>
      jobId === id && refetchJobCandidates && refetchJobCandidates()
  )

  const isBestMatchQueryEnabled = checkBestMatchQueryEnabled(filterValues)

  return (
    <ContentWrapper
      title='Talents'
      itemsCount={totalCount}
      itemsCountLoading={loading}
      prependContent={
        jobId && (
          <JobSkillsFilter
            jobId={jobId}
            filterValues={filterValues}
            handleFilterChange={handleFilterChange}
          />
        )
      }
      actions={<TalentListActions />}
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
            data={talentsData}
            itemWithoutSection
            renderItem={({ talentId, jobCandidate }, index) => (
              <TalentListItem
                talentId={talentId}
                jobCandidate={jobCandidate}
                jobId={jobId}
                jobData={jobData}
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
  )
}

export default TalentList
