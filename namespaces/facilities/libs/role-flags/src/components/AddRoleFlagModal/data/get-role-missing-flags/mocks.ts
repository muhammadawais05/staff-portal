import { GetRoleMissingFlagsQueryVariables } from './get-role-missing-flags.staff.gql.types'
import { GET_ROLE_MISSING_FLAGS } from './get-role-missing-flags.staff.gql'

export const createGetMissingFlagsMock = (
  { roleId }: GetRoleMissingFlagsQueryVariables,
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
  request: { query: GET_ROLE_MISSING_FLAGS, variables: { roleId } },
  result: {
    data: {
      node: {
        id: roleId,
        missingFlags: {
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
        __typename: 'Talent'
      },
      viewer: {
        permits: {
          createTalentInfractions: true,
          __typename: 'Permits'
        },
        __typename: 'Viewer'
      }
    }
  }
})
