import { GetRoleFlagsQueryVariables } from './get-role-flags.staff.gql.types'
import { GET_ROLE_FLAGS } from './get-role-flags.staff.gql'

export const createGetRoleFlagsMock = (
  { roleId }: GetRoleFlagsQueryVariables,
  {
    flagId,
    flagTitle,
    flagToken
  }: {
    flagId: string
    flagTitle: string
    flagToken?: string
  }
) => ({
  request: { query: GET_ROLE_FLAGS, variables: { roleId } },
  result: {
    data: {
      staffNode: {
        id: roleId,
        roleFlags: {
          nodes: [
            {
              title: flagTitle,
              id: flagId,
              color: null,
              token: flagToken ?? 'flag_token',
              __typename: 'Flag'
            }
          ],
          __typename: 'FlagConnection'
        },
        __typename: 'RoleFlagConnection'
      }
    }
  }
})
