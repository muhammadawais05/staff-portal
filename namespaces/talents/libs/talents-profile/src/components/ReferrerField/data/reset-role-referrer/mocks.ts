import { ResetRoleReferrerInput } from '@staff-portal/graphql/staff'

import { RESET_ROLE_REFERRER } from './reset-role-referrer.staff.gql'

export const createResetRoleReferrerMock = (input: ResetRoleReferrerInput) => ({
  request: { query: RESET_ROLE_REFERRER, variables: { input } },
  result: {
    data: {
      resetRoleReferrer: {
        role: {
          id: input.roleId,
          referrer: {
            id: 'someId',
            webResource: {
              text: 'someText',
              url: 'https://someUrl.com',
              __typename: 'Link'
            },
            __typename: 'Staff'
          },
          __typename: 'Talent'
        },
        errors: [],
        success: true,
        __typename: 'ResetRoleReferrerPayload'
      }
    },
    __typename: 'ResetRoleReferrerPayload'
  }
})
