import {
  Filters,
  Pagination,
  SearchBar,
  toGqlFilter,
  usePagination
} from '@staff-portal/filters'
import { SourcingRequestFilter } from '@staff-portal/graphql/staff'
import ContentWrapper from '@staff-portal/page-wrapper'
import { ItemsList, NoSearchResultsMessage } from '@staff-portal/ui'
import { Container } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import React from 'react'

import { SourcingRequestsListItemFragment } from '../../data/sourcing-requests-list-item-fragment/sourcing-requests-list-item-fragment.staff.gql.types'
import SourcingRequestListItem from './containers/SourcingRequestListItem/SourcingRequestListItem'
import { useGetSourcingRequestsList } from './data/get-sourcing-requests-list/get-sourcing-requests-list.staff.gql'
import getOrder from './services/get-order/get-order'
import { getSortOptions } from './services/get-sort-options/get-sort-options'
import { useFiltersConfig } from './services/use-filters-config/use-filters-config'
import useGetGqlParamConfig from './services/use-get-gql-param-config/use-get-gql-param-config'
import useGetPaginationConfig from './services/use-get-pagination-config/use-get-pagination-config'
import { useGetSearchBarCategories } from './services/use-get-search-bar-categories/use-get-search-bar-categories'
import { useGetVerticalIds } from './services/use-get-vertical-ids'

const NO_RESULTS_MESSAGE =
  'There are no sourcing requests for this search criteria'
const PAGE_SIZE = 25

const getSourcingRequestKey = ({ id }: SourcingRequestsListItemFragment) => id

const SourcingRequestList = () => {
  const { showError } = useNotifications()
  const gqlParamConfig = useGetGqlParamConfig()
  const sortOptions = getSortOptions()
  const searchBarCategories = useGetSearchBarCategories()
  const filtersConfig = useFiltersConfig()
  const paginationConfig = useGetPaginationConfig(searchBarCategories)
  const {
    page,
    limit,
    pagination,
    resolving,
    filterValues,
    handlePageChange,
    handleFilterChange
  } = usePagination({
    config: paginationConfig,
    limit: PAGE_SIZE
  })

  const filter = toGqlFilter<Record<string, unknown>, SourcingRequestFilter>(
    gqlParamConfig,
    filterValues
  )

  const order = getOrder(filterValues)
  const { verticalIds, verticalsLoading } = useGetVerticalIds(filterValues)

  const queryDataLoading = resolving || verticalsLoading

  const { data, loading: sourcingRequestLoading } = useGetSourcingRequestsList(
    { pagination, filter: { ...filter, verticalIds }, order },
    queryDataLoading
  )

  const loading = sourcingRequestLoading || queryDataLoading

  return (
    <ContentWrapper title='Sourcing Requests' itemsCount={data?.totalCount}>
      <Filters
        values={filterValues}
        onChange={handleFilterChange}
        config={filtersConfig}
        sortOptions={sortOptions}
      >
        {nestableControls => (
          <SearchBar
            name='badges'
            categories={searchBarCategories}
            nestableControls={nestableControls}
            onError={() => showError('Unable to fetch items.')}
          />
        )}
      </Filters>

      <Container top='large'>
        <ItemsList<SourcingRequestsListItemFragment>
          data={data?.nodes}
          loading={loading}
          itemWithoutSection
          notFoundMessage={
            <NoSearchResultsMessage message={NO_RESULTS_MESSAGE} />
          }
          getItemKey={getSourcingRequestKey}
          renderItem={(sourcingRequest, index) => (
            <SourcingRequestListItem
              sourcingRequest={sourcingRequest}
              key={index}
            />
          )}
        />
      </Container>

      <Container top='medium'>
        <Pagination
          activePage={page}
          onPageChange={handlePageChange}
          limit={limit}
          itemCount={data?.totalCount}
        />
      </Container>
    </ContentWrapper>
  )
}

export default SourcingRequestList
