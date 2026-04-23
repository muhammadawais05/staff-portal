import { SendTalentToSpecializationInput } from '@staff-portal/graphql/staff'

import { SEND_TALENT_TO_SPECIALIZATION } from './send-talent-to-specialization.staff.gql'

export const createSendTalentToSpecializationMock = ({
  input,
  success,
  errorMessage
}: {
  input: SendTalentToSpecializationInput
  success: boolean
  errorMessage: string
}) => ({
  request: {
    query: SEND_TALENT_TO_SPECIALIZATION,
    variables: { input }
  },
  result: {
    data: {
      sendTalentToSpecialization: {
        talent: {
          id: input.talentId,
          __typename: 'Talent'
        },
        success,
        errors: [
          {
            key: 'base',
            code: 'screeningNotPossible',
            message: errorMessage,
            __typename: 'GraniteError'
          }
        ],
        __typename: 'SendTalentToSpecializationPayload'
      }
    }
  }
})

export const createSendTalentToSpecializationFailedMock = (
  input: SendTalentToSpecializationInput
) => ({
  request: { query: SEND_TALENT_TO_SPECIALIZATION, variables: { input } },
  error: new Error('Error occurred')
})
