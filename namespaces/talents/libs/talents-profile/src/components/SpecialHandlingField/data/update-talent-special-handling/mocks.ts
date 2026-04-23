import { UpdateTalentSpecialHandlingInput } from '@staff-portal/graphql/staff'

import { UPDATE_TALENT_SPECIAL_HANDLING } from './update-talent-special-handling.staff.gql'

export const createUpdateTalentSpecialHandlingMock = (
  input: UpdateTalentSpecialHandlingInput
) => ({
  request: { query: UPDATE_TALENT_SPECIAL_HANDLING, variables: { input } },
  result: {
    data: {
      updateTalentSpecialHandling: {
        success: true,
        errors: [],
        __typename: 'UpdateTalentSpecialHandlingPayload',
        talent: {
          id: input.talentId,
          specialHandling: input.specialHandling,
          __typename: 'Talent'
        }
      }
    }
  }
})

export const createUpdateTalentSpecialHandlingFailedMock = (
  input: UpdateTalentSpecialHandlingInput,
  errorMessage?: string
) => ({
  request: { query: UPDATE_TALENT_SPECIAL_HANDLING, variables: { input } },
  result: {
    data: {
      updateTalentSpecialHandling: {
        talent: null,
        success: false,
        errors: [
          {
            code: 'UpdateTalentSpecialHandlingFailed',
            key: 'base',
            message: errorMessage || 'Failed updating special handling',
            __typename: 'GraniteError'
          }
        ],
        __typename: 'UpdateTalentSpecialHandlingPayload'
      }
    }
  }
})
