import { Container } from '@toptal/picasso'
import React, { ReactNode } from 'react'
import { ItemsList, NoSearchResultsMessage } from '@staff-portal/ui'
import { Filters, Pagination } from '@staff-portal/filters'
import { useTouchCounter, CounterName } from '@staff-portal/counters'
import { ContentWrapper } from '@staff-portal/page-wrapper'
import { useGetUserVerticals } from '@staff-portal/verticals'
import { JobListItem, JobListSkeletonLoader } from '@staff-portal/jobs'

import { useGetJobsList } from './data/get-jobs-list'
import useHandleJobListFilters from '../../hooks/use-handle-job-list-filters'
import JobListSearchBar from '../../components/JobListSearchBar'
import { useFiltersConfig } from '../../hooks'
import JobListActions from '../../components/JobListActions'

const NO_RESULTS_MESSAGE = 'There are no jobs for this search criteria'
const searchBarWithNestedControls = (nestableControls: ReactNode) => (
  <JobListSearchBar nestableControls={nestableControls} />
)

const renderItem = ({ id }: { id: string }) => (
  <JobListItem jobId={id} variant='withHeaderBar' />
)
const getItemKey = ({ id }: { id: string }) => id

const JobsList = () => {
  const {
    resolving,
    limit,
    page,
    pagination,
    filterValues,
    sortOptions,
    handlePageChange,
    handleFilterChange
  } = useHandleJobListFilters()

  const { data: verticals, initialLoading: verticalsLoading } =
    useGetUserVerticals({ skip: !filterValues.job_types })

  const queryDataLoading = resolving || verticalsLoading

  const {
    data: jobs,
    totalCount,
    loading: jobsLoading
  } = useGetJobsList({
    filterValues,
    pagination,
    verticals,
    skip: queryDataLoading
  })

  useTouchCounter({
    counterName: CounterName.PendingJobs
  })

  const { filtersConfig } = useFiltersConfig()
  // wait for permits to load before showing filters because job statuses depend on user permissions
  const loading = jobsLoading || queryDataLoading

  return (
    <ContentWrapper
      title='Jobs'
      itemsCount={totalCount}
      itemsCountLoading={loading}
      actions={<JobListActions />}
    >
      <Filters
        values={filterValues}
        config={filtersConfig}
        onChange={handleFilterChange}
        sortOptions={sortOptions}
      >
        {searchBarWithNestedControls}
      </Filters>

      <Container top='large' bottom='large'>
        {loading ? (
          <JobListSkeletonLoader sectionVariant='withHeaderBar' />
        ) : (
          <ItemsList
            data={jobs}
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

export default JobsList
