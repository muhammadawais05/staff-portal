import { GET_TRACK_ONLINE_TEST_ATTEMPT } from './get-track-online-test-attempt.staff.gql'

export const createGetTrackOnlineTestAttemptMock = ({
  onlineTestAttemptId,
  talentId,
  testName,
  stepName,
  currentTestName,
  roleSteps
}: {
  onlineTestAttemptId: string
  talentId: string
  testName?: string
  stepName?: string
  currentTestName?: string
  roleSteps?: []
}) => ({
  request: {
    query: GET_TRACK_ONLINE_TEST_ATTEMPT,
    variables: { onlineTestId: onlineTestAttemptId, talentId }
  },
  result: {
    data: {
      talent: {
        id: talentId,
        roleSteps: {
          nodes: roleSteps || [
            {
              id: 'VjEtUm9sZVN0ZXAtMTE0NDY1Ng',
              onlineTestAttempt: {
                id: 'test-id',
                test: {
                  id: 'test-id',
                  name: currentTestName || 'For integration testing purposes',
                  __typename: 'CodilityTest'
                },
                __typename: 'CodilityResult'
              },
              step: {
                id: 'test-id',
                title: stepName || 'Online Test Core',
                __typename: 'Step'
              },
              __typename: 'RoleStep'
            }
          ],
          __typename: 'RoleStepConnection'
        },
        __typename: 'Talent'
      },
      subject: {
        id: onlineTestAttemptId,
        test: {
          id: 'VjEtUm9sZVN0ZXAtMTE0NDY1Ng',
          name: testName || 'For integration testing purposes',
          __typename: 'CodilityTest'
        },
        __typename: 'CodilityResult'
      }
    }
  }
})

export const createGetTrackOnlineTestAttemptFailedMock = ({
  onlineTestAttemptId
}: {
  onlineTestAttemptId: string
}) => ({
  request: {
    query: GET_TRACK_ONLINE_TEST_ATTEMPT,
    variables: { onlineTestAttemptId }
  },
  error: new Error('Network error occurred')
})
