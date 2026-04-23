import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetEngagementProposeEndDateDocument } from '../data'

const getLazyEngagementProposeEndDateHook = (engagementId: string) => () => {
  const [request, { data, loading, error }] = useLazyQuery(
    GetEngagementProposeEndDateDocument,
    {
      variables: { engagementId }
    }
  )

  return {
    request,
    data: data?.node?.proposedEnd?.endDate,
    error,
    loading
  }
}

export default getLazyEngagementProposeEndDateHook
