import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetClientFullAndLegalNameDocument } from '../data/get-client-legal-and-full-name.staff.gql.types'

export const getClientLegalAndFullNameHook = (clientId: string) => () => {
  const [request, { data, loading, called, error }] = useLazyQuery(
    GetClientFullAndLegalNameDocument,
    {
      variables: { clientId }
    }
  )

  return {
    request,
    loading,
    error,
    data: data?.node?.legalName || data?.node?.fullName,
    called
  }
}
