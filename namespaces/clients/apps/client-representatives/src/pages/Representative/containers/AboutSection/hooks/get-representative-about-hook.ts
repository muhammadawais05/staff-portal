import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetRepresentativeAboutDocument } from '../data'

export const getRepresentativeAboutHook = (representativeId?: string) => () => {
  const [request, { data, loading, called, error }] = useLazyQuery(
    GetRepresentativeAboutDocument,
    {
      variables: { representativeId }
    }
  )

  return {
    request,
    loading,
    error,
    data: data?.node?.about || '',
    called
  }
}
