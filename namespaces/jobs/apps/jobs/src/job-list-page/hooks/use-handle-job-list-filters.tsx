import { QueryParamsOptions } from '@staff-portal/query-params-state'
import {
  searchBarQueryParam,
  usePagination,
  rangeQueryParam,
  gqlIdQueryParam
} from '@staff-portal/filters'

import { PAGE_SIZE } from '../config'
import { searchBarCategories } from '../components'
import { getSortOptions } from '../utils/get-sort-options'

const QUERY_PARAMS_CONFIG: QueryParamsOptions = {
  badges: searchBarQueryParam(searchBarCategories),
  timezones: rangeQueryParam,
  parent_client_id: gqlIdQueryParam('Client')
}

const sortOptions = getSortOptions()

const useHandleJobListFilters = () => {
  const {
    page,
    pagination,
    limit,
    filterValues,
    resolving,
    handlePageChange,
    handleFilterChange
  } = usePagination({
    config: QUERY_PARAMS_CONFIG,
    limit: PAGE_SIZE
  })

  return {
    page,
    pagination,
    limit,
    filterValues,
    sortOptions,
    handlePageChange,
    handleFilterChange,
    resolving
  }
}

export default useHandleJobListFilters
