import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetClientMatchersDocument } from '../data/get-client-matchers.staff.gql.types'

export const getClientMatchersHook =
  (clientId: string, talentType: string) => () => {
    const [request, { data, loading, called, error }] = useLazyQuery(
      GetClientMatchersDocument,
      {
        variables: { clientId }
      }
    )

    return {
      request,
      loading,
      error,
      data:
        data?.node?.matchers?.edges?.find(
          matcher => matcher?.node?.vertical?.talentType === talentType
        )?.node?.role.id ?? undefined,
      called
    }
  }
