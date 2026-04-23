import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetJobStationViewerPermitsDocument } from './get-viewer-permits.staff.gql.types'

export const GET_VIEWER_PERMITS: typeof GetJobStationViewerPermitsDocument = gql`
  query GetJobStationViewerPermits {
    viewer {
      permits {
        filterOnTeamIds
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
