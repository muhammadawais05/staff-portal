import { UpdateEligibleForRestorationInput } from '@staff-portal/graphql/staff'

import { UPDATE_ELIGIBLE_FOR_RESTORATION } from './update-eligible-for-restoration.staff.gql'

export const createUpdateEligibleForRestorationMock = (
  input: UpdateEligibleForRestorationInput
) => ({
  request: { query: UPDATE_ELIGIBLE_FOR_RESTORATION, variables: { input } },
  result: {
    data: {
      updateEligibleForRestoration: {
        success: true,
        errors: [],
        talent: {
          id: input.talentId,
          eligibleForRestoration: input.eligibleForRestoration,
          __typename: 'Talent'
        },
        __typename: 'UpdateTalentSpecialHandlingPayload'
      }
    }
  }
})

export const createUpdateEligibleForRestorationFailedMock = (
  input: UpdateEligibleForRestorationInput
) => ({
  request: { query: UPDATE_ELIGIBLE_FOR_RESTORATION, variables: { input } },
  error: new Error('Network error occurred')
})
