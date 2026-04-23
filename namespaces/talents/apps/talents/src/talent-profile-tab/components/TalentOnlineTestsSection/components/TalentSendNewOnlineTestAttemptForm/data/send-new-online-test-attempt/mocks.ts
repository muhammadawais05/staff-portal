import { SendNewTestForOnlineTestAttemptInput } from '@staff-portal/graphql/staff'

import { SEND_NEW_ONLINE_TEST_ATTEMPT } from './send-new-online-test-attempt.staff.gql'

export const createSendNewOnlineTestAttemptMock = (
  input: SendNewTestForOnlineTestAttemptInput
) => ({
  request: { query: SEND_NEW_ONLINE_TEST_ATTEMPT, variables: { input } },
  result: {
    data: {
      sendNewTestForOnlineTestAttempt: {
        success: true,
        errors: [],
        onlineTestAttempt: {
          id: input.onlineTestAttemptId,
          __typename: 'CodilityResult'
        },
        __typename: 'SendNewTestForOnlineTestAttemptPayload'
      }
    }
  }
})

export const createSendNewOnlineTestAttemptFailedMock = (
  input: SendNewTestForOnlineTestAttemptInput,
  errorMessage?: string
) => ({
  request: { query: SEND_NEW_ONLINE_TEST_ATTEMPT, variables: { input } },
  result: {
    data: {
      sendNewTestForOnlineTestAttempt: {
        success: false,
        errors: [
          {
            code: 'talentAlreadyInvitedForTestHtml',
            key: 'base',
            message:
              errorMessage ||
              'There is already a pending test, you must cancel the pending test first.',
            __typename: 'GraniteError'
          }
        ],
        onlineTestAttempt: null,
        __typename: 'SendNewTestForOnlineTestAttemptPayload'
      }
    }
  }
})
