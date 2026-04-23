import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetClientInterestedInDocument } from '../data'

export const getClientInterestedInHook = (clientId: string) => () => {
  const [request, { data, loading, called, error }] = useLazyQuery(
    GetClientInterestedInDocument,
    { variables: { clientId } }
  )

  return {
    request,
    loading,
    data: data?.node?.interestedIn || undefined,
    error,
    called
  }
}
