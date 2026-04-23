import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetClientPhoneContactsDocument } from '../../../data/get-client-phone-contacts.staff.gql.types'

export const getClientPhoneContactsHook = (clientId: string) => () => {
  const [request, { data, loading, called, error }] = useLazyQuery(
    GetClientPhoneContactsDocument,
    {
      variables: { clientId }
    }
  )

  return {
    request,
    loading,
    error,
    data: data?.node?.contact?.orderedPhoneNumbers?.nodes || [],
    called
  }
}
