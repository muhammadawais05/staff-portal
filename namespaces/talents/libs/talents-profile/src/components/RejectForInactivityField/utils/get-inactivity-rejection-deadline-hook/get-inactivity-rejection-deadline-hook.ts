import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetInactivityRejectionDeadlineDocument } from '../../data/get-inactivicty-rejection-deadline/get-inactivicty-rejection-deadline.staff.gql.types'

export const getInactivityRejectionDeadlineHook =
  (inactivityRejectionDeadlineId: string) => () => {
    const [request, { data, loading, called, error }] = useLazyQuery(
      GetInactivityRejectionDeadlineDocument,
      {
        variables: { inactivityRejectionDeadlineId }
      }
    )

    return {
      request,
      loading,
      error,
      data: data?.node?.date,
      called
    }
  }
