import { ChangeRoleReferrerInput } from '@staff-portal/graphql/staff'

import { CHANGE_ROLE_REFERRER } from './change-role-referrer.staff.gql'

export const createChangeRoleReferrerMock = (
  input: ChangeRoleReferrerInput
) => ({
  request: { query: CHANGE_ROLE_REFERRER, variables: { input } },
  result: {
    data: {
      changeRoleReferrer: {
        role: {
          id: input.roleOrClientId,
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
        __typename: 'ChangeRoleReferrerPayload'
      }
    },
    __typename: 'ChangeRoleReferrerPayload'
  }
})
