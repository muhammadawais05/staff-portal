import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetViewerPermitsDocument } from './get-viewer-permits.staff.gql.types'

export default gql`
  query GetViewerPermits {
    viewer {
      permits {
        assignTalentPartner
      }
    }
  }
`

export const useGetViewerPermits = () => {
  const { data, loading } = useQuery(GetViewerPermitsDocument)

  return {
    permits: data?.viewer?.permits,
    loading
  }
}
