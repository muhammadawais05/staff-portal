import { ResetTalentReapplicationDateMutation } from './reset-talent-reapplication-date.staff.gql.types'
import { RESET_TALENT_REAPPLICATION_DATE } from './reset-talent-reapplication-date.staff.gql'

export const createResetTalentReapplicationDateMock = ({
  talentId
}: {
  talentId: string
}) => {
  const data: ResetTalentReapplicationDateMutation & {
    resetTalentReapplicationDate: {
      __typename: string
      talent: { __typename: string }
    }
    __typename: string
  } = {
    resetTalentReapplicationDate: {
      success: true,
      errors: [],
      talent: {
        id: talentId,
        reapplicationDate: null,
        __typename: 'Talent'
      },
      __typename: 'ResetTalentReapplicationDatePayload'
    },
    __typename: 'Mutation'
  }

  return {
    request: {
      query: RESET_TALENT_REAPPLICATION_DATE,
      variables: { input: { talentId } }
    },
    result: { data }
  }
}

export const createResetTalentReapplicationDateFailedMock = ({
  talentId
}: {
  talentId: string
}) => ({
  request: {
    query: RESET_TALENT_REAPPLICATION_DATE,
    variables: { talentId }
  },
  error: new Error('Network error occurred')
})
