import { QueryParamsOptions } from '@staff-portal/query-params-state'
import { useMemo } from 'react'

const useGetPaginationConfig = () => {
  const paginationConfig: QueryParamsOptions = useMemo(() => ({}), [])

  return paginationConfig
}

export default useGetPaginationConfig
