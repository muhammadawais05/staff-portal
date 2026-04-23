import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetClientTimeZoneDocument } from '../data/get-client-time-zone.staff.gql.types'

export const getClientTimeZoneHook = (clientId: string) => () => {
  const [request, { data, loading, called, error }] = useLazyQuery(
    GetClientTimeZoneDocument,
    {
      variables: { clientId }
    }
  )

  return {
    request,
    loading,
    error,
    data: data?.node?.timeZone?.name,
    called
  }
}
