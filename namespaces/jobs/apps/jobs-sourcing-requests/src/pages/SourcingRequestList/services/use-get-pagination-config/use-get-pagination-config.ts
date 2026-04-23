import {
  enumQueryParam,
  gqlArrayIdQueryParam,
  gqlIdQueryParam,
  gqlNoneMeIdQueryParam,
  SearchBarCategories,
  searchBarQueryParam,
  singleEnumQueryParam
} from '@staff-portal/filters'
import { QueryParamsOptions } from '@staff-portal/query-params-state'
import { useMemo } from 'react'

const useGetPaginationConfig = <T>(
  searchBarCategories: SearchBarCategories<T>
) => {
  const paginationConfig: QueryParamsOptions = useMemo(
    () => ({
      badges: searchBarQueryParam(searchBarCategories),
      claimer_id: gqlNoneMeIdQueryParam('Staff'),
      company_id: gqlIdQueryParam('Client'),
      talent_specialist_id: gqlNoneMeIdQueryParam('Staff'),
      client_partner_id: gqlNoneMeIdQueryParam('Staff'),
      business_type: singleEnumQueryParam,
      statuses: enumQueryParam,
      specialization_ids: gqlArrayIdQueryParam('Specialization'),
      work_types: enumQueryParam,
      commitments: enumQueryParam
    }),
    [searchBarCategories]
  )

  return paginationConfig
}

export default useGetPaginationConfig
