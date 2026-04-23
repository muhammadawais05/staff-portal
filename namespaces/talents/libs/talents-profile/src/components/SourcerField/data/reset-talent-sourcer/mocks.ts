import { ResetTalentSourcerInput } from '@staff-portal/graphql/staff'

import { RESET_TALENT_SOURCER } from './reset-talent-sourcer.staff.gql'

export const createResetTalentSourcerMock = (
  input: ResetTalentSourcerInput
) => ({
  request: { query: RESET_TALENT_SOURCER, variables: { input } },
  result: {
    data: {
      resetTalentSourcer: {
        talent: {
          id: input.talentId,
          sourcer: {
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
        __typename: 'ResetTalentSourcerPayload'
      }
    },
    __typename: 'ResetTalentSourcerPayload'
  }
})
