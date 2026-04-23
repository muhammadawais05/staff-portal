import { GET_EXPIRED_CALL_TIMERS } from './get-expired-call-timer-status-messages.staff.gql'
import { GetExpiredCallTimersQuery } from './get-expired-call-timer-status-messages.staff.gql.types'
import { createExpiredCallTimerMessageFragmentMock } from '../expired-call-timer-message-fragment/mocks'

export const createGetExpiredCallTimerStatusMessagesMock = (
  clientNames: string[] = []
) => {
  const expiredCallTimers = clientNames.map(clientName => ({
    id: 'test-id',
    ...createExpiredCallTimerMessageFragmentMock(clientName)
  }))
  const getStatusMessageMock: GetExpiredCallTimersQuery & {
    viewer: { expiredCallTimers: { __typename: string }; __typename: string }
  } = {
    viewer: {
      me: {
        // TODO: should receive the value from outside
        id: '123',
        __typename: 'Staff'
      },
      expiredCallTimers: {
        nodes: expiredCallTimers,
        __typename: 'ExpiredCallTimerConnection'
      },
      __typename: 'Viewer'
    }
  }

  return {
    request: { query: GET_EXPIRED_CALL_TIMERS, variables: {} },
    result: { data: getStatusMessageMock }
  }
}

export const createGetExpiredCallTimerStatusMessagesFailedMock = (
  errors: [Error] = [new Error('Default test error message')]
) => ({
  request: { query: GET_EXPIRED_CALL_TIMERS, variables: {} },
  errors
})
