import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetActivationStepDeadlineDocument } from '../../data/get-activation-deadline/get-activation-deadline.staff.gql.types'

export const getActivationDeadlineHook = (activationStepId: string) => () => {
  const [request, { data, loading, called, error }] = useLazyQuery(
    GetActivationStepDeadlineDocument,
    {
      variables: { activationStepId }
    }
  )

  return {
    request,
    loading,
    error,
    data: data?.node?.deadlineAt,
    called
  }
}
