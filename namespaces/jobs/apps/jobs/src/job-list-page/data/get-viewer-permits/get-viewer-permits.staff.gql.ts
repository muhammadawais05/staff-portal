import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetJobListViewerPermitsDocument } from './get-viewer-permits.staff.gql.types'

export const GET_VIEWER_PERMITS: typeof GetJobListViewerPermitsDocument = gql`
  query GetJobListViewerPermits {
    viewer {
      permits {
        createClaimableJob
        canViewAllJobStatuses
      }
    }
  }
`

export const useViewerPermits = (onError: () => void) => {
  const { data, loading, error } = useQuery(GET_VIEWER_PERMITS, { onError })

  return {
    permits: data?.viewer.permits,
    loading,
    error
  }
}
