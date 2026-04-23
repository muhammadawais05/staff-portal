import { gql, useQuery } from '@staff-portal/data-layer-service'

import { PermissionFieldNameType } from '../../types'
import { GetPermissionsDocument } from './get-permissions.staff.gql.types'

// When you add a new field to your config,
// add a permission field name to the query
export const GET_PERMISSIONS = gql`
  query GetPermissions {
    viewer {
      permits {
        canViewVerticalHistory
      }
    }
  }
`

export const useGetPermissions = (fieldName: PermissionFieldNameType) => {
  const { data, loading, error } = useQuery(GetPermissionsDocument)

  return { canView: data?.viewer?.permits[fieldName], loading, error }
}
