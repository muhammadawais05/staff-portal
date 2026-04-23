import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetClientAnnualRevenueDocument } from '../data'

export const getClientAnnualRevenueHook = (clientId: string) => () => {
  const [request, { data, loading, called, error }] = useLazyQuery(
    GetClientAnnualRevenueDocument,
    { variables: { clientId } }
  )

  return {
    request,
    loading,
    error,
    data: data?.node?.annualRevenue ?? '',
    called
  }
}
