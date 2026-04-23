import { Scalars } from '@staff-portal/graphql/staff'

import { UpdateTalentReapplicationDateMutation } from './update-talent-reapplication-date.staff.gql.types'
import { UPDATE_TALENT_REAPPLICATION_DATE } from './update-talent-reapplication-date.staff.gql'

export const createUpdateTalentReapplicationDateMock = ({
  talentId,
  reapplicationDate
}: {
  talentId: string
  reapplicationDate: Scalars['Date'] | null
}) => {
  const data: UpdateTalentReapplicationDateMutation & {
    updateTalentReapplicationDate: {
      __typename: string
      talent: { __typename: string }
    }
    __typename: string
  } = {
    updateTalentReapplicationDate: {
      success: true,
      errors: [],
      talent: {
        id: talentId,
        reapplicationDate,
        __typename: 'Talent'
      },
      __typename: 'UpdateTalentReapplicationDatePayload'
    },
    __typename: 'Mutation'
  }

  return {
    request: {
      query: UPDATE_TALENT_REAPPLICATION_DATE,
      variables: { input: { talentId, reapplicationDate } }
    },
    result: { data }
  }
}

export const createUpdateTalentReapplicationDateFailedMock = ({
  talentId,
  reapplicationDate
}: {
  talentId: string
  reapplicationDate: string
}) => ({
  request: {
    query: UPDATE_TALENT_REAPPLICATION_DATE,
    variables: { talentId, reapplicationDate }
  },
  error: new Error('Network error occurred')
})
