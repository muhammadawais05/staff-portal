import React, { useEffect } from 'react'
import { Container } from '@toptal/picasso'
import {
  ApolloError,
  isAuthorizationGqlError
} from '@staff-portal/data-layer-service'
import { ItemsList, NoSearchResultsMessage } from '@staff-portal/ui'
import { QueryParamsOptions } from '@staff-portal/query-params-state'
import {
  usePagination,
  SortOption,
  Pagination,
  FiltersHeader,
  FiltersContent,
  useFiltersState,
  dateRangeQueryParam,
  SortOrder,
  FiltersContextProvider
} from '@staff-portal/filters'
import { useTouchCounter, CounterName } from '@staff-portal/counters'
import { ContentWrapper } from '@staff-portal/page-wrapper'
import {
  CallRequestListItem,
  CallRequestFragment
} from '@staff-portal/clients-call-requests'

import { useGetCallRequestsList } from './data/get-call-requests-list'
import useFiltersConfig from './use-filters-config'
import useRedirectToCallRequestModal from './hooks/use-redirect-to-call-request-modal'
import { CallRequestModalName } from '../../enums'

export const SORT_OPTIONS: SortOption[] = [
  {
    text: 'Expected start time',
    value: 'requested_start_time',
    defaultSort: SortOrder.ASC
  },
  { text: 'Created at', value: 'created_at' },
  { text: 'Call claimed at', value: 'claimed_at' }
]

const PAGE_SIZE = 10

const NO_RESULTS_MESSAGE =
  'There are no callback requests for this search criteria'

export interface Props {}

const QUERY_PARAMS_CONFIG: QueryParamsOptions = {
  created_at: dateRangeQueryParam,
  call_claimed_at: dateRangeQueryParam
}

const getItemKey = (item: CallRequestFragment) => String(item.id)

const getError = (data?: CallRequestFragment[], error?: ApolloError) => {
  if (error?.graphQLErrors && data) {
    const nonAuthorizationErrors = error.graphQLErrors.filter(
      graphQLError => !isAuthorizationGqlError(graphQLError)
    )
    const errorShouldBeIgnored = nonAuthorizationErrors.length === 0

    if (errorShouldBeIgnored) {
      return undefined
    }
  }

  return error
}

const CallRequestList = () => {
  const {
    handlePageChange,
    handleFilterChange,
    page,
    limit,
    pagination,
    filterValues,
    resolving
  } = usePagination({
    config: QUERY_PARAMS_CONFIG,
    limit: PAGE_SIZE
  })

  const { fetchData, callRequests, totalCount, loading, error } =
    useGetCallRequestsList({ pagination })

  useRedirectToCallRequestModal(CallRequestModalName.CLAIM)

  useTouchCounter({
    counterName: CounterName.CallbackRequestsUnclaimed
  })

  useEffect(() => {
    if (resolving) {
      return
    }
    fetchData()
  }, [fetchData, resolving])

  const { filtersConfig } = useFiltersConfig()
  const renderItem = (item: CallRequestFragment) => (
    <CallRequestListItem data={item} />
  )

  const { hasFiltersExpanded, setHasFilterExpanded } = useFiltersState()

  if (getError(callRequests, error)) {
    throw error
  }

  return (
    <FiltersContextProvider
      filterValues={filterValues}
      setFilterValues={handleFilterChange}
      config={filtersConfig}
    >
      <ContentWrapper
        title='Call Requests'
        itemsCount={totalCount}
        actions={
          <FiltersHeader
            hasFiltersExpanded={hasFiltersExpanded}
            setHasFilterExpanded={setHasFilterExpanded}
            sortOptions={SORT_OPTIONS}
            filtersSize='small'
          />
        }
      >
        <FiltersContent
          hasFiltersExpanded={hasFiltersExpanded}
          config={filtersConfig}
        />
        <Container top='xsmall' bottom='medium'>
          <ItemsList
            data={callRequests || []}
            loading={loading}
            renderItem={renderItem}
            getItemKey={getItemKey}
            notFoundMessage={
              <NoSearchResultsMessage message={NO_RESULTS_MESSAGE} />
            }
          />
        </Container>
        <Pagination
          activePage={page}
          onPageChange={handlePageChange}
          limit={limit}
          itemCount={totalCount}
        />
      </ContentWrapper>
    </FiltersContextProvider>
  )
}

export default CallRequestList
