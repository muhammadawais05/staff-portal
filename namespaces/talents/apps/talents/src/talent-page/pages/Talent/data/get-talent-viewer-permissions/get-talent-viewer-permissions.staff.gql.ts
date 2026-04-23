import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetTalentViewerPermissionsDocument } from './get-talent-viewer-permissions.staff.gql.types'

export default gql`
  query GetTalentViewerPermissions {
    viewer {
      permits {
        canViewJob
      }
    }
  }
`

export const useGetTalentViewerPermissions = () => {
  const { data, ...restOptions } = useQuery(GetTalentViewerPermissionsDocument)

  return {
    ...restOptions,
    viewerPermissions: data?.viewer.permits
  }
}
