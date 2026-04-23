import { GET_TALENT_NEW_ONLINE_TEST_ATTEMPT } from './get-talent-new-online-test-attempt.staff.gql'
import { GetTalentNewOnlineTestAttemptQuery } from './get-talent-new-online-test-attempt.staff.gql.types'

export const createGetTalentNewOnlineTestAttemptMock = ({
  onlineTestAttemptId,
  onlineTests,
  testName,
  stepName
}: {
  onlineTestAttemptId: string
  onlineTests?: GetTalentNewOnlineTestAttemptQuery['onlineTests']
  testName?: string
  stepName?: string
}) => ({
  request: {
    query: GET_TALENT_NEW_ONLINE_TEST_ATTEMPT,
    variables: { onlineTestAttemptId }
  },
  result: {
    data: {
      node: {
        id: onlineTestAttemptId,
        trackingRoleSteps: {
          nodes: [
            {
              id: 'VjEtUm9sZVN0ZXAtMTEzOTQ0Ng',
              step: {
                id: 'test-id',
                title: stepName || 'Online Test Core',
                __typename: 'Step'
              },
              __typename: 'RoleStep'
            }
          ],
          __typename: 'OnlineTestAttemptTrackingRoleStepConnection'
        },
        test: {
          id: 'VjEtQ29kaWxpdHlUZXN0LTI',
          name: testName || 'For integration testing purposes',
          __typename: 'CodilityTest'
        },
        __typename: 'CodilityResult'
      },
      onlineTests: {
        nodes: [
          {
            id: 'VjEtQ29kaWxpdHlUZXN0LTI',
            name: 'For integration testing purposes',
            service: 'Codility',
            __typename: 'CodilityTest'
          },
          {
            id: 'VjEtSGFja2VyUmFua1Rlc3QtMQ',
            name: '[Staging] Entry Level Test',
            service: 'HackerRank',
            __typename: 'HackerRankTest'
          }
        ],
        __typename: 'OnlineTestConnection',
        ...onlineTests
      }
    }
  }
})

export const createGetTalentNewOnlineTestAttemptFailedMock = ({
  onlineTestAttemptId
}: {
  onlineTestAttemptId: string
}) => ({
  request: {
    query: GET_TALENT_NEW_ONLINE_TEST_ATTEMPT,
    variables: { onlineTestAttemptId }
  },
  error: new Error('Network error occurred')
})
