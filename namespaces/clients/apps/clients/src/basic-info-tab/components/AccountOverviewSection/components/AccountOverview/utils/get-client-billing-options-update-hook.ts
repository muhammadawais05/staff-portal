import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetClientBillingOptionsUpdateDocument } from '../data/get-client-billing-options-update.staff.gql.types'

export const getClientBillingOptionsUpdateHook = (clientId: string) => () => {
  const [request, { data, loading, called, error }] = useLazyQuery(
    GetClientBillingOptionsUpdateDocument,
    {
      variables: { clientId }
    }
  )

  return {
    request,
    loading,
    error,
    data: Number(data?.node?.billingOptionsUpdateEnabled ?? true),
    called
  }
}
