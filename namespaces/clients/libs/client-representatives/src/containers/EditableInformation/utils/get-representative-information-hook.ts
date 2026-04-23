import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetRepresentativeInformationDocument } from '../data'

export const getRepresentativeInformationHook =
  (representativeId: string) => () => {
    const [request, { data, loading, called, error }] = useLazyQuery(
      GetRepresentativeInformationDocument,
      {
        variables: { representativeId }
      }
    )

    return {
      request,
      loading,
      error,
      data: data?.node?.information || '',
      called
    }
  }
