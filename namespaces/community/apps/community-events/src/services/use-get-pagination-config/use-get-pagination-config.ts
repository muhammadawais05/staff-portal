import { useMemo } from 'react'
import {
  enumQueryParam,
  searchBarQueryParam,
  dateRangeQueryParam,
  gqlIdQueryParam,
  SearchBarCategories,
  singleEnumQueryParam
} from '@staff-portal/filters'
import { QueryParamsOptions } from '@staff-portal/query-params-state'

export const useGetPaginationConfig = <T>(
  searchBarCategories: SearchBarCategories<T>
) => {
  const paginationConfig: QueryParamsOptions = useMemo(
    () => ({
      badges: searchBarQueryParam(searchBarCategories),
      country_id: gqlIdQueryParam('Country'),
      contact_id: gqlIdQueryParam('CommunityEventHost'),
      start_date: dateRangeQueryParam,
      event_source: singleEnumQueryParam,
      categories: enumQueryParam,
      statuses: enumQueryParam,
      venue_type: singleEnumQueryParam
    }),
    [searchBarCategories]
  )

  return paginationConfig
}
