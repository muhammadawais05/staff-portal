import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetClientMissionDocument } from '../data'

const getClientMissionHook = (clientId: string) => () => {
  const [request, { data, loading, called, error }] = useLazyQuery(
    GetClientMissionDocument,
    {
      variables: { clientId }
    }
  )

  return {
    request,
    loading,
    error,
    data: data?.node?.mission ?? '',
    called
  }
}

export default getClientMissionHook
