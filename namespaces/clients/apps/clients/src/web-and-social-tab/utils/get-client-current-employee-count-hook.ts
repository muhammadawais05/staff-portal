import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetClientCurrentEmployeeCountDocument } from '../data'

export const getClientCurrentEmployeeCountHook = (clientId: string) => () => {
  const [request, { data, loading, called, error }] = useLazyQuery(
    GetClientCurrentEmployeeCountDocument,
    {
      variables: { clientId }
    }
  )

  return {
    request,
    loading,
    data: data?.node?.currentEmployeeCount ?? undefined,
    error,
    called
  }
}
