import { RoleV2Scope } from '@staff-portal/graphql/staff';
import { useQuery } from '@staff-portal/data-layer-service';

import { GetStaffRolesDocument } from '../data';

export const useGetStaffRoles = (scope: RoleV2Scope) => {
  const { data, initialLoading, loading } = useQuery(GetStaffRolesDocument, {
    variables: { filter: { scope } }
  })

  const { roles: { nodes: roles = [] } = {} } = data || {}
  const options = roles.map(({ fullName, id, type }) => ({
    text: `${fullName} (${type})`,
    value: id
  }))

  return { options, initialLoading, loading }
}
