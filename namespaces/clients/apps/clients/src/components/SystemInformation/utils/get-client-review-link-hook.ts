import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetClientReviewLinkDocument } from '../data'

export const getClientReviewLinkHook = (clientId: string) => () => {
  const [request, { data, loading, called, error }] = useLazyQuery(
    GetClientReviewLinkDocument,
    { variables: { clientId } }
  )

  return {
    request,
    loading,
    data: data?.node?.reviewLink || undefined,
    error,
    called
  }
}
