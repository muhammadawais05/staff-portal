import { useMemo } from 'react'
import {
  dateRangeQueryParam,
  enumQueryParam,
  gqlIdQueryParam,
  gqlArrayIdQueryParam,
  searchBarQueryParam,
  rangeQueryParam
} from '@staff-portal/filters'
import { QueryParamsOptions } from '@staff-portal/query-params-state'

import useGetSearchBarCategories from '../use-get-search-bar-categories/use-get-search-bar-categories'

const useGetPaginationConfig = () => {
  const searchBarCategories = useGetSearchBarCategories()
  const paginationConfig: QueryParamsOptions = useMemo(
    () => ({
      badges: searchBarQueryParam(searchBarCategories),
      country_id: gqlIdQueryParam('Country'),
      applied_on: dateRangeQueryParam,
      timezones: rangeQueryParam,
      ofac_status: enumQueryParam,
      flag_ids: gqlArrayIdQueryParam('Flag'),
      team_ids: gqlArrayIdQueryParam('Team'),
      cumulative_statuses: enumQueryParam
    }),
    [searchBarCategories]
  )

  return paginationConfig
}

export default useGetPaginationConfig
