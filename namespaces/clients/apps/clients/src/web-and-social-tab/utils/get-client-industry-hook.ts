import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetClientIndustryDocument } from '../data'

export const getClientIndustryHook = (clientId: string) => () => {
  const [request, { data, loading, called, error }] = useLazyQuery(
    GetClientIndustryDocument,
    { variables: { clientId } }
  )

  return {
    request,
    loading,
    data: data?.node?.industry ?? undefined,
    error,
    called
  }
}
