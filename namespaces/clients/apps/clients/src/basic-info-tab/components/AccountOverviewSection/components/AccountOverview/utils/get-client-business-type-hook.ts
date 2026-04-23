import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetClientBusinessTypeDocument } from '../data/get-client-business-type.staff.gql.types'

export const getClientBusinessTypeHook = (clientId: string) => () => {
  const [request, { data, loading, called, error }] = useLazyQuery(
    GetClientBusinessTypeDocument,
    {
      variables: { clientId }
    }
  )

  return {
    request,
    loading,
    error,
    data: data?.node?.businessType ?? undefined,
    called
  }
}
