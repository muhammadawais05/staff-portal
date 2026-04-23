import { RemoveSoftSkillRatingInput } from '@staff-portal/graphql/staff'

import { RemoveSoftSkillRatingDocument } from './remove-soft-skill-rating.staff.gql.types'

export const createRemoveSoftSkillRatingMock = (
  input: RemoveSoftSkillRatingInput
) => ({
  request: { query: RemoveSoftSkillRatingDocument, variables: { input } },
  result: {
    data: {
      removeSoftSkillRating: {
        success: true,
        errors: [],
        softSkillRating: {
          id: input.softSkillRatingId,
          __typename: 'SoftSkillRating'
        },
        __typename: 'RemoveSoftSkillRatingPayload'
      }
    }
  }
})
