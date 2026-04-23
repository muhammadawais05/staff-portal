import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetTalentTopShieldDocument } from '../../../data'

export const getLazyInterviewCompletedDate = (talentId: string) => () => {
  const [request, { data, loading, called, error }] = useLazyQuery(
    GetTalentTopShieldDocument,
    {
      variables: { talentId, loadDisputeOperations: true, isForEdit: false }
    }
  )

  return {
    request,
    loading,
    data: data?.node?.topShieldApplication?.interviewCompletedDate,
    error,
    called
  }
}
