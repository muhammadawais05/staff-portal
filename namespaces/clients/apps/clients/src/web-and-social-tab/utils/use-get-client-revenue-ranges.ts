import { useMemo } from 'react'
import { useLazyQuery } from '@staff-portal/data-layer-service'
import { stringListToOptions } from '@staff-portal/string'

import { GetClientRevenueRangesDocument } from '../data'

export const useGetClientRevenueRanges = () => {
  const [
    request,
    { data: { clientRevenueRanges = undefined } = {}, loading, error, called }
  ] = useLazyQuery(GetClientRevenueRangesDocument)

  const data = useMemo(
    () => stringListToOptions(clientRevenueRanges),
    [clientRevenueRanges]
  )

  return {
    request,
    loading,
    data,
    error,
    called
  }
}
