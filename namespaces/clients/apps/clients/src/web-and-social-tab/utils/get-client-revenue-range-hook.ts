import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetClientRevenueRangeDocument } from '../data'

export const getClientRevenueRangeHook = (clientId: string) => () => {
  const [request, { data, loading, called, error }] = useLazyQuery(
    GetClientRevenueRangeDocument,
    { variables: { clientId } }
  )

  return {
    request,
    loading,
    error,
    data: data?.node?.revenueRange || undefined,
    called
  }
}
