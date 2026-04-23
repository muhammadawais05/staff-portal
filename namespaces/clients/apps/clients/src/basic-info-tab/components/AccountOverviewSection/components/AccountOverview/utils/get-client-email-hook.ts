import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetClientEmailDocument } from '../data/get-client-email.staff.gql.types'

export const getClientEmailHook = (clientId: string) => () => {
  const [request, { data, loading, called, error }] = useLazyQuery(
    GetClientEmailDocument,
    {
      variables: { clientId }
    }
  )

  return {
    request,
    loading,
    error,
    data: data?.node?.email,
    called
  }
}
