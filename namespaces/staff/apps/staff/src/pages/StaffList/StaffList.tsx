import {
  Pagination,
  usePagination,
  toGqlFilter,
  SearchBar,
  Filters
} from '@staff-portal/filters'
import { ItemsList, NoSearchResultsMessage } from '@staff-portal/ui'
import ContentWrapper from '@staff-portal/page-wrapper'
import { Container } from '@toptal/picasso'
import React from 'react'
import { useNotifications } from '@staff-portal/error-handling'
import { StaffFilter } from '@staff-portal/graphql/staff'
import { REFETCH_STAFF_LIST } from '@staff-portal/staff'
import { useMessageListener } from '@toptal/staff-portal-message-bus'

import StaffListItem from './containers/StaffListItem/StaffListItem'
import { StaffListItemFragment } from './data/get-staffs-list/get-staffs-list.staff.gql.types'
import { useGetStaffsList } from './data/get-staffs-list/get-staffs-list.staff.gql'
import getOrder from './services/get-order/get-order'
import getSortOptions from './services/get-sort-options/get-sort-options'
import useGetSearchBarCategories from './services/use-get-search-bar-categories/use-get-search-bar-categories'
import useGetGqlParamConfig from './services/use-get-gql-param-config/use-get-gql-param-config'
import useGetPaginationConfig from './services/use-get-pagination-config/use-get-pagination-config'
import useFiltersConfig from './services/use-filters-config/use-filters-config'
import InviteNewStaffButton from './containers/InviteNewStaffButton/InviteNewStaffButton'

const NO_RESULTS_MESSAGE = 'There are no staff users for this search criteria'
const PAGE_SIZE = 25

const getStaffKey = ({ id }: StaffListItemFragment) => id

const StaffList = () => {
  const { showError } = useNotifications()
  const sortOptions = getSortOptions()
  const searchBarCategories = useGetSearchBarCategories()
  const gqlParamConfig = useGetGqlParamConfig()
  const paginationConfig = useGetPaginationConfig()
  const filtersConfig = useFiltersConfig()
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
  const filter = toGqlFilter<Record<string, unknown>, StaffFilter>(
    gqlParamConfig,
    filterValues
  )
  const order = getOrder(filterValues)
  const { data, loading, refetch } = useGetStaffsList(
    { pagination, filter, order },
    resolving
  )

  useMessageListener(REFETCH_STAFF_LIST, refetch)

  return (
    <ContentWrapper
      title='Staff'
      itemsCount={data?.totalCount}
      actions={<InviteNewStaffButton />}
    >
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
        <ItemsList<StaffListItemFragment>
          data={data?.nodes}
          loading={loading}
          itemWithoutSection
          notFoundMessage={
            <NoSearchResultsMessage message={NO_RESULTS_MESSAGE} />
          }
          getItemKey={getStaffKey}
          renderItem={(staff, index) => (
            <StaffListItem staff={staff} key={index} />
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

export default StaffList
