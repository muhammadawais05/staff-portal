import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetClientCareerPagesDocument } from '../data'

export const getClientCareerPagesHook = (clientId: string) => () => {
  const [request, { data, loading, called, error }] = useLazyQuery(
    GetClientCareerPagesDocument,
    {
      variables: { clientId }
    }
  )

  return {
    request,
    loading,
    data: data?.node?.careerPages?.nodes ?? undefined,
    error,
    called
  }
}
