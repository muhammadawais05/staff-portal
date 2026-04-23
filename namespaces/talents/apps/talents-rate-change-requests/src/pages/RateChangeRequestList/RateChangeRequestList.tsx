import React, { useMemo } from 'react'
import { Container } from '@toptal/picasso'
import { ItemsList, NoSearchResultsMessage } from '@staff-portal/ui'
import { hasAuthorizationError } from '@staff-portal/data-layer-service'
import { Pagination, usePagination } from '@staff-portal/filters'
import { ContentWrapper } from '@staff-portal/page-wrapper'

import {
  RateChangeRequestFragment,
  useGetRateChangeRequestList
} from '../../data'
import { RateChangeRequestItem } from '../../components'
import {
  PAGE_SIZE,
  NO_RESULTS_MESSAGE,
  RATE_CHANGE_REQUESTS_QUERY_PARAMS_CONFIG,
  RateChangeRequestListQueryParams
} from '../../constants'
import { RateChangeRequestListFilters } from './components'
import { createGqlFilterVariables } from './utils'

export const RateChangeRequestList = () => {
  const {
    page,
    limit,
    filterValues,
    pagination,
    resolving,
    handlePageChange,
    handleFilterChange
  } = usePagination<RateChangeRequestListQueryParams>({
    config: RATE_CHANGE_REQUESTS_QUERY_PARAMS_CONFIG,
    limit: PAGE_SIZE
  })

  const gqlFilterVariables = useMemo(
    () => createGqlFilterVariables(filterValues, pagination),
    [filterValues, pagination]
  )

  const { data, loading, error } = useGetRateChangeRequestList(
    gqlFilterVariables,
    resolving
  )

  const rateRecommendationUnauthorized = hasAuthorizationError(
    error,
    'rateRecommendation'
  )

  const isLoading = resolving || loading

  return (
    <ContentWrapper
      title='Rate Change Requests'
      itemsCount={data?.totalCount}
      actions={[]}
    >
      <RateChangeRequestListFilters
        filterValues={filterValues}
        onChange={handleFilterChange}
      />
      <Container top='medium' bottom='medium'>
        <ItemsList<RateChangeRequestFragment>
          data={data?.rateChangeRequests}
          itemWithoutSection
          loading={isLoading}
          getItemKey={item => String(item.id)}
          renderItem={item => (
            <RateChangeRequestItem
              rateChangeRequest={item}
              rateRecommendationUnauthorized={rateRecommendationUnauthorized}
            />
          )}
          notFoundMessage={
            <NoSearchResultsMessage message={NO_RESULTS_MESSAGE} />
          }
        />
      </Container>

      <Pagination
        activePage={page}
        onPageChange={handlePageChange}
        limit={limit}
        itemCount={data?.totalCount}
      />
    </ContentWrapper>
  )
}

export default RateChangeRequestList
