import { QueryParamsOptions } from '@staff-portal/query-params-state'
import { usePagination, searchBarQueryParam } from '@staff-portal/filters'

import { PAGE_SIZE } from '../config'
import { searchBarCategories } from '../components'

const QUERY_PARAMS_CONFIG: QueryParamsOptions = {
  badges: searchBarQueryParam(searchBarCategories)
}

const useHandleQuizzesFilters = () => {
  const {
    page,
    pagination,
    limit,
    filterValues,
    handlePageChange,
    handleFilterChange,
    resolving: resolvingFilters
  } = usePagination({
    config: QUERY_PARAMS_CONFIG,
    limit: PAGE_SIZE
  })

  return {
    page,
    pagination,
    limit,
    filterValues,
    resolvingFilters,
    handlePageChange,
    handleFilterChange
  }
}

export default useHandleQuizzesFilters
