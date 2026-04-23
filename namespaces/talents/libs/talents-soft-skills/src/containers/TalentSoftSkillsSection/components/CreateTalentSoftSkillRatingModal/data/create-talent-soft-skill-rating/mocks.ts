import { CreateTalentSoftSkillRatingInput } from '@staff-portal/graphql/staff'

import { CreateTalentSoftSkillRatingDocument } from './create-talent-soft-skill-rating.staff.gql.types'

export const createCreateTalentSoftSkillRatingMock = ({
  input,
  success,
  errorMessage
}: {
  input: CreateTalentSoftSkillRatingInput
  success: boolean
  errorMessage?: string
}) => ({
  request: {
    query: CreateTalentSoftSkillRatingDocument,
    variables: { input }
  },
  result: {
    data: {
      createTalentSoftSkillRating: {
        success,
        errors: errorMessage
          ? [
              {
                key: 'base',
                code: 'someError',
                message: errorMessage,
                __typename: 'GraniteError'
              }
            ]
          : [],
        __typename: 'CreateTalentSoftSkillRatingPayload'
      }
    }
  }
})

export const createCreateTalentSoftSkillRatingFailedMock = (
  input: CreateTalentSoftSkillRatingInput
) => ({
  request: { query: CreateTalentSoftSkillRatingDocument, variables: { input } },
  error: new Error('Error occurred')
})
