import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetBillingNotesDocument } from '../data/get-billing-notes'

export const getBillingNotesHook = (roleOrClientId: string) => () => {
  const [request, { data, loading, called, error }] = useLazyQuery(
    GetBillingNotesDocument,
    {
      variables: { roleOrClientId }
    }
  )

  return {
    request,
    loading,
    error,
    data: data?.node?.billingNotes || '',
    called
  }
}
