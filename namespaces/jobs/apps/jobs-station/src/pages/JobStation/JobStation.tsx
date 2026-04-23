import React, { useCallback } from 'react'
import { Container } from '@toptal/picasso'
import { Job } from '@staff-portal/graphql/staff'
import { PageLoader } from '@staff-portal/ui'
import {
  QueryParams,
  QueryParamsOptions
} from '@staff-portal/query-params-state'
import {
  Filters,
  Pagination,
  usePagination,
  gqlIdQueryParam,
  PaginationParams,
  singleEnumQueryParam
} from '@staff-portal/filters'
import { ContentWrapper } from '@staff-portal/page-wrapper'
import { useAnalytics } from '@staff-portal/monitoring-service'

import { filterUnusedOptions, toGqlVariables } from './services'
import JobStationSearchBar from './components/JobStationSearchBar/JobStationSearchBar'
import { useGetJobsList, useFiltersConfig } from './data'
import { SORT_OPTIONS, JOBS_STATION_DEFAULT_PAGE_SIZE } from './constants'
import { trackStatusFiltersClick } from './services/track-status-filters-click/track-status-filters-click'
import JobsTable from './components/JobsTable/JobsTable'

interface JobQueryParams extends PaginationParams {
  matcher?: string
}

const QUERY_PARAMS_CONFIG: QueryParamsOptions = {
  client: gqlIdQueryParam('Client'),
  business_type: singleEnumQueryParam
}

const JobStation = () => {
  const { track } = useAnalytics()
  const {
    page,
    pagination,
    limit,
    filterValues,
    resolving,
    handlePageChange,
    handleFilterChange: onFilterChange
  } = usePagination<JobQueryParams>({
    config: QUERY_PARAMS_CONFIG,
    limit: JOBS_STATION_DEFAULT_PAGE_SIZE,
    onFilterChange: useCallback(
      (urlValues, values) => {
        trackStatusFiltersClick(urlValues, values, track)
      },
      [track]
    )
  })

  const gqlVariables = toGqlVariables(filterValues, pagination)

  const {
    data,
    loading,
    refetch: refetchJobs
  } = useGetJobsList(gqlVariables, resolving)

  const handleFilterChange = useCallback(
    (values: QueryParams) => onFilterChange(filterUnusedOptions(values)),
    [onFilterChange]
  )

  const { filtersConfig } = useFiltersConfig(
    filterValues,
    data?.statusCounters,
    data?.pendingTalentStatusCounters
  )

  if (resolving || !data) {
    return <PageLoader />
  }

  return (
    <ContentWrapper title='Job Station' itemsCount={data.totalCount}>
      <Filters
        values={filterValues}
        config={filtersConfig}
        onChange={handleFilterChange}
        sortOptions={SORT_OPTIONS}
      >
        {nestableControls => (
          <JobStationSearchBar nestableControls={nestableControls} />
        )}
      </Filters>

      <Container top='medium' bottom='medium'>
        <JobsTable
          loading={loading}
          data={data.jobs as Job[]}
          refreshJobList={refetchJobs}
        />
      </Container>

      <Pagination
        activePage={page}
        onPageChange={handlePageChange}
        limit={limit}
        itemCount={data.totalCount}
      />
    </ContentWrapper>
  )
}

export default JobStation
