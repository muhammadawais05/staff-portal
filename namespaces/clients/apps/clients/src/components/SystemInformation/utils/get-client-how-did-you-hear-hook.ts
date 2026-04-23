import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetClientHowDidYouHearDocument } from '../data'

export const getClientHowDidYouHearHook = (clientId: string) => () => {
  const [request, { data, loading, called, error }] = useLazyQuery(
    GetClientHowDidYouHearDocument,
    { variables: { clientId } }
  )

  return {
    request,
    loading,
    data: data?.node?.howDidYouHear || undefined,
    error,
    called
  }
}
