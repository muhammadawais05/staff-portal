import { RejectSpecializationApplicationInput } from '@staff-portal/graphql/staff'

import { RejectSpecializationApplicationMutation } from './reject-specialization-application.staff.gql.types'
import REJECT_SPECIALIZATION_APPLICATION from './reject-specialization-application.staff.gql'

export const createRejectSpecializationApplicationMock = ({
  input,
  response = {}
}: {
  input: RejectSpecializationApplicationInput
  response?: Partial<
    RejectSpecializationApplicationMutation['rejectSpecializationApplication'] & {
      emailTemplate?: { __typename: string }
    }
  >
}) => ({
  request: {
    query: REJECT_SPECIALIZATION_APPLICATION,
    variables: { input }
  },
  result: {
    data: {
      rejectSpecializationApplication: {
        emailTemplate: {
          id: '123',
          __typename: 'EmailTemplate'
        },
        nextActionPerformable: false,
        success: true,
        errors: [],
        ...response,
        __typename: 'RejectSpecializationApplicationPayload'
      }
    }
  }
})

export const createRejectSpecializationApplicationFailedMock = (
  input: RejectSpecializationApplicationInput
) => ({
  request: { query: REJECT_SPECIALIZATION_APPLICATION, variables: { input } },
  error: new Error('Error occurred')
})
