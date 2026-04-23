import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetClientSkypeDocument } from '../data/get-client-skype.staff.gql.types'

export const getClientSkypeHook = (clientId: string) => () => {
  const [request, { data, loading, called, error }] = useLazyQuery(
    GetClientSkypeDocument,
    { variables: { clientId } }
  )

  return {
    request,
    loading,
    error,
    data: data?.node?.contact?.contacts.nodes[0]?.value,
    called
  }
}
