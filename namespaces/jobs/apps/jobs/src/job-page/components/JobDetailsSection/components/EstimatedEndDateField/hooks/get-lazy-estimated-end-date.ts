import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetEstimatedEndDateDocument } from '../data/get-estimated-end-date'

export const getLazyEstimatedEndDate = (jobId: string) => () => {
  const [request, { data, loading, error }] = useLazyQuery(
    GetEstimatedEndDateDocument,
    {
      variables: { jobId }
    }
  )

  return {
    request,
    data: data?.node?.estimatedEndDate,
    error,
    loading
  }
}
