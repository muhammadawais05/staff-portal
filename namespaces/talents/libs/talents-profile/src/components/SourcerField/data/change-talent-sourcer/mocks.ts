import { ChangeTalentSourcerInput } from '@staff-portal/graphql/staff'

import { CHANGE_TALENT_SOURCER } from './change-talent-sourcer.staff.gql'

export const createChangeTalentSourcerMock = (
  input: ChangeTalentSourcerInput
) => ({
  request: { query: CHANGE_TALENT_SOURCER, variables: { input } },
  result: {
    data: {
      changeTalentSourcer: {
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
        __typename: 'ChangeTalentSourcerPayload'
      }
    },
    __typename: 'ChangeTalentSourcerPayload'
  }
})
