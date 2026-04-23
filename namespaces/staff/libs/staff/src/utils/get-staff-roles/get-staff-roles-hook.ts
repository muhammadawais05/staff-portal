import { useMemo } from 'react'
import { RoleV2Scope } from '@staff-portal/graphql/staff'
import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetStaffRolesDocument } from '../../data'

export const getStaffRolesHook = (scope: RoleV2Scope) => () => {
  const [request, { data, loading, called, error }] = useLazyQuery(
    GetStaffRolesDocument,
    {
      variables: {
        filter: {
          scope
        }
      }
    }
  )

  const nodes = data?.roles.nodes
  const options = useMemo(
    () => nodes?.map(({ id: value, fullName: text }) => ({ text, value })),
    [nodes]
  )

  return {
    request,
    loading,
    error,
    data: options,
    called
  }
}
