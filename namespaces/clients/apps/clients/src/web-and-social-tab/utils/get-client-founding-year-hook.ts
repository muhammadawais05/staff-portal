import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetClientFoundingYearDocument } from '../data'

export const getClientFoundingYearHook = (clientId: string) => () => {
  const [request, { data, loading, called, error }] = useLazyQuery(
    GetClientFoundingYearDocument,
    { variables: { clientId } }
  )

  return {
    request,
    loading,
    data: data?.node?.foundingYear || undefined,
    error,
    called
  }
}
