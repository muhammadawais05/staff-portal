import { useMemo } from 'react'
import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetCompanyRegionsDocument } from '../../../../../data'

export const useGetCompanyRegions = () => {
  const [request, { data, loading, called, error }] = useLazyQuery(
    GetCompanyRegionsDocument
  )

  const items = useMemo(
    () =>
      data?.regions?.nodes.map(({ id, name }) => ({ text: name, value: id })),
    [data]
  )

  return {
    request,
    loading,
    data: items || [],
    error,
    called
  }
}
