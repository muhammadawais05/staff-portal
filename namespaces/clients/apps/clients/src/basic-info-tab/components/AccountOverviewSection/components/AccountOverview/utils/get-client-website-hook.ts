import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetClientWebsiteDocument } from '../data/get-client-website.staff.gql.types'

export const getClientWebsiteHook = (clientId: string) => () => {
  const [
    request,
    { data, loading, called, error }
  ] = useLazyQuery(GetClientWebsiteDocument, { variables: { clientId } })

  return {
    request,
    loading,
    error,
    data: data?.node?.website ?? '',
    called
  }
}
