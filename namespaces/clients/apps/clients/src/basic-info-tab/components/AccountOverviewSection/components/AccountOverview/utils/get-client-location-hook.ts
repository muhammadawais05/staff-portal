import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetClientLocationDocument } from '../data/get-client-location.staff.gql.types'

export const getClientLocationHook = (clientId: string) => () => {
  const [request, { data, loading, called, error }] = useLazyQuery(
    GetClientLocationDocument,
    {
      variables: { clientId }
    }
  )

  return {
    request,
    loading,
    error,
    data: { countryId: data?.node?.country?.id },
    called
  }
}
