import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetCompanyParentLinkDocument } from '../data/get-client-parent-link.staff.gql.types'

export const getParentLinkHook = (clientId: string) => () => {
  const [request, { data, loading, called, error }] = useLazyQuery(
    GetCompanyParentLinkDocument,
    {
      variables: { clientId }
    }
  )

  return {
    request,
    data: data?.node?.parent?.id,
    loading,
    called,
    error
  }
}
