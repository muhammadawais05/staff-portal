import { UserError } from '@staff-portal/graphql/staff'

import { StartCallMutationVariables } from './start-call.staff.gql.types'
import { START_CALL } from './start-call.staff.gql'

export const createStartCallMock = ({
  input
}: {
  input: StartCallMutationVariables['input']
}) => ({
  request: { query: START_CALL, variables: { input } },
  result: {
    data: {
      startCall: {
        success: true,
        notice: null,
        errors: [],
        __typename: 'MutationResult'
      }
    }
  }
})

export const createStartCallInvalidMock = ({
  input,
  noticeMessage = null,
  errors = []
}: {
  input: StartCallMutationVariables['input']
  noticeMessage?: string | null
  errors?: UserError[]
}) => ({
  request: { query: START_CALL, variables: { input } },
  result: {
    data: {
      startCall: {
        success: false,
        notice: noticeMessage,
        errors: errors.map(error => ({
          ...error,
          __typename: 'UserError'
        })),
        __typename: 'MutationResult'
      }
    }
  }
})

export const createStartCallFailedMock = ({
  input
}: {
  input: StartCallMutationVariables['input']
}) => ({
  request: { query: START_CALL, variables: { input } },
  error: new Error('Network error occurred')
})
