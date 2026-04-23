import { UserError } from '@staff-portal/graphql/staff'
import { MockedResponse } from '@staff-portal/data-layer-service'

import { DiscardTalentPrescreeningVideoMutationVariables } from './discard-talent-prescreening-video.staff.gql.types'
import { DISCARD_TALENT_PRESCREENING_VIDEO } from './discard-talent-prescreening-video.staff.gql'

export const createDiscardTalentPrescreeningVideoMock = (
  input: DiscardTalentPrescreeningVideoMutationVariables['input']
): MockedResponse => {
  return {
    request: {
      query: DISCARD_TALENT_PRESCREENING_VIDEO,
      variables: { input }
    },
    result: {
      data: {
        discardTalentPrescreeningVideo: {
          success: true,
          errors: [],
          __typename: 'DiscardTalentPrescreeningVideoPayload'
        }
      }
    }
  }
}

export const createDiscardTalentPrescreeningVideoInvalidMock = ({
  input,
  errors = []
}: {
  input: DiscardTalentPrescreeningVideoMutationVariables['input']
  errors?: UserError[]
}) => ({
  request: { query: DISCARD_TALENT_PRESCREENING_VIDEO, variables: { input } },
  result: {
    data: {
      discardTalentPrescreeningVideo: {
        success: false,
        errors: errors.map(error => ({
          ...error,
          __typename: 'UserError'
        })),
        __typename: 'DiscardTalentPrescreeningVideoPayload'
      }
    }
  }
})

export const createDiscardTalentPrescreeningVideoFailedMock = ({
  talentId
}: {
  talentId: string
}) => ({
  request: {
    query: DISCARD_TALENT_PRESCREENING_VIDEO,
    variables: { talentId }
  },
  error: new Error('Network error occurred')
})
