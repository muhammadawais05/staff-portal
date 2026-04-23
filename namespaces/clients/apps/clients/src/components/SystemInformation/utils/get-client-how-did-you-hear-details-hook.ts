import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetClientHowDidYouHearDetailsDocument } from '../data'

export const getClientHowDidYouHearDetailsHook = (clientId: string) => () => {
  const [request, { data, loading, called, error }] = useLazyQuery(
    GetClientHowDidYouHearDetailsDocument,
    {
      variables: { clientId }
    }
  )

  return {
    request,
    loading,
    data: data?.node?.howDidYouHearDetails || undefined,
    error,
    called
  }
}
