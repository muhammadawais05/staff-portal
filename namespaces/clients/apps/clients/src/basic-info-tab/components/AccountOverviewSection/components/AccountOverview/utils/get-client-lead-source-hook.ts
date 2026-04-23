import { LeadSource } from '@staff-portal/graphql/staff'
import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetClientLeadSourceDocument } from '../data'

export const getClientLeadSourceHook = (clientId: string) => () => {
  const [request, { data, loading, called, error }] = useLazyQuery(
    GetClientLeadSourceDocument,
    {
      variables: { clientId }
    }
  )

  return {
    request,
    loading,
    error,
    data: data?.node?.leadSource || LeadSource.INBOUND,
    called
  }
}
