import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetClientFullNameDocument } from '../data'

export const useGetClientFullName = (clientId: string) => {
  const [request, { data, loading, called, error }] = useLazyQuery(
    GetClientFullNameDocument,
    {
      variables: { clientId }
    }
  )

  return () => ({
    request,
    loading,
    error,
    data: data?.node?.fullName,
    called
  })
}
