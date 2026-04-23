import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetClientAboutDocument } from '../data'

const getClientAboutHook = (clientId: string) => () => {
  const [request, { data, loading, called, error }] = useLazyQuery(
    GetClientAboutDocument,
    {
      variables: { clientId }
    }
  )

  return {
    request,
    loading,
    error,
    data: data?.node?.about || data?.node?.buyingSignalsService?.about || '',
    called
  }
}

export default getClientAboutHook
