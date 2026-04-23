import {
  CancelOnlineTestAttemptInput,
  CancelOnlineTestAttemptPayload,
  UserError
} from '@staff-portal/graphql/staff'

import { CANCEL_ONLINE_TEST_ATTEMPT } from './cancel-online-test-attempt.staff.gql'

export const createCancelOnlineTestAttemptMock = (
  input: CancelOnlineTestAttemptInput
) => {
  const mutationResult: Omit<
    CancelOnlineTestAttemptPayload,
    'onlineTestAttempt'
  > & {
    __typename: string
    onlineTestAttempt: { id: string; __typename: string }
  } = {
    success: true,
    errors: [],
    onlineTestAttempt: {
      id: input.onlineTestAttemptId,
      __typename: 'CodilityResult'
    },
    __typename: 'CancelOnlineTestAttemptPayload'
  }

  return {
    request: { query: CANCEL_ONLINE_TEST_ATTEMPT, variables: { input } },
    result: {
      data: {
        cancelOnlineTestAttempt: mutationResult
      }
    }
  }
}

export const createCancelOnlineTestAttemptFailedMock = (
  input: CancelOnlineTestAttemptInput,
  errorMessage?: string
) => {
  const mutationResult: CancelOnlineTestAttemptPayload & {
    __typename: string
    errors: (UserError & { __typename: string })[]
  } = {
    success: false,
    errors: [
      {
        code: 'ErrorOccurred',
        key: 'base',
        message: errorMessage || 'Error occurred',
        __typename: 'GraniteError'
      }
    ],
    onlineTestAttempt: null,
    __typename: 'CancelOnlineTestAttemptPayload'
  }

  return {
    request: { query: CANCEL_ONLINE_TEST_ATTEMPT, variables: { input } },
    result: {
      data: { cancelOnlineTestAttempt: mutationResult }
    }
  }
}
