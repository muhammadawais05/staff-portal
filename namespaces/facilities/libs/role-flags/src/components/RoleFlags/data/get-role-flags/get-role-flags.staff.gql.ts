import { gql, useGetData } from '@staff-portal/data-layer-service'

import { ROLE_FLAG_FRAGMENT } from '../../../../data/role-flag-fragment'
import { GetRoleFlagsDocument } from './get-role-flags.staff.gql.types'

export const GET_ROLE_FLAGS: typeof GetRoleFlagsDocument = gql`
  query GetRoleFlags($roleId: ID!) {
    staffNode(id: $roleId) {
      ... on Client {
        id
        roleFlags {
          nodes {
            ...RoleFlagFragment
          }
        }
      }
      ... on Staff {
        id
        roleFlags {
          nodes {
            ...RoleFlagFragment
          }
        }
      }
      ... on Role {
        id
        roleFlags {
          nodes {
            ...RoleFlagFragment
          }
        }
      }
    }
  }

  ${ROLE_FLAG_FRAGMENT}
`

export const useGetRoleFlags = (roleId: string) => {
  const { data, ...restOptions } = useGetData(
    GetRoleFlagsDocument,
    'staffNode'
  )(
    { roleId },
    {
      fetchPolicy: 'cache-first'
    }
  )

  return { ...restOptions, data: data?.roleFlags?.nodes }
}
