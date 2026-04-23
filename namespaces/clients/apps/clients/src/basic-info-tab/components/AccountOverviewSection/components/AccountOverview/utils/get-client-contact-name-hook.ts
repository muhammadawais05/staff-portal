import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetClientContactNameDocument } from '../data/get-client-contact-name.staff.gql.types'

export const getClientContactNameHook = (clientId: string) => () => {
  const [request, { data, loading, called, error }] = useLazyQuery(
    GetClientContactNameDocument,
    {
      variables: { clientId }
    }
  )

  return {
    request,
    loading,
    error,
    data: data?.node?.contact?.fullName || undefined,
    called
  }
}
