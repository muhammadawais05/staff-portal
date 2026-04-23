import { TrackOnlineTestAttemptInput } from '@staff-portal/graphql/staff'

import { TRACK_ONLINE_TEST_ATTEMPT } from './track-online-test-attempt.staff.gql'

export const createTrackOnlineTestAttempMock = (
  input: TrackOnlineTestAttemptInput
) => ({
  request: { query: TRACK_ONLINE_TEST_ATTEMPT, variables: { input } },
  result: {
    data: {
      trackOnlineTestAttempt: {
        success: true,
        errors: [],
        onlineTestAttempt: {
          id: input.onlineTestAttemptId,
          __typename: 'CodilityResult'
        },
        __typename: 'TrackOnlineTestAttemptPayload'
      }
    }
  }
})

export const createTrackOnlineTestAttemptFailedMock = (
  input: TrackOnlineTestAttemptInput,
  errorMessage?: string
) => ({
  request: { query: TRACK_ONLINE_TEST_ATTEMPT, variables: { input } },
  result: {
    data: {
      trackOnlineTestAttempt: {
        success: false,
        errors: [
          {
            code: 'TestAlreadyTracked',
            key: 'base',
            message: errorMessage || 'The test is already being tracked',
            __typename: 'GraniteError'
          }
        ],
        onlineTestAttempt: null,
        __typename: 'TrackOnlineTestAttemptPayload'
      }
    }
  }
})
