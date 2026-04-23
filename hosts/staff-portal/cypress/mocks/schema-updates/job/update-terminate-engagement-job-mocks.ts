import { Job, Engagement } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { successMutationMock } from '../../mutations'
import { enabledOperationMock } from '../../enabled-operation-mock'
import { jobPageStubs } from '../../request-stubs'
import { getEngagementOperations } from '../../fragments/get-engagement-operations'
import { getFeedbackReasonsResponse } from '~integration/mocks/responses/engagement/get-feedback-reasons-response'

const updateTerminateEngagementJobMocks = (job?: Partial<Job>) =>
  cy.stubGraphQLRequests({
    ...jobPageStubs({
      currentEngagement: {
        id: encodeEntityId('123', 'Engagement'),
        job: {
          talentCount: 1
        },
        operations: getEngagementOperations({
          terminateEngagement: enabledOperationMock()
        }),
        __typename: 'Engagement'
      } as unknown as Engagement,
      ...job
    }),
    GetLazyOperation: {
      data: {
        node: {
          __typename: 'Engagement',
          id: encodeEntityId('123', 'Engagement'),
          operations: {
            terminateEngagement: enabledOperationMock(),
            __typename: 'EngagementOperations'
          }
        }
      }
    },
    TerminateEngagement: {
      data: {
        terminateEngagement: successMutationMock()
      }
    },
    GetFeedbackReasons: getFeedbackReasonsResponse()
  })

export default updateTerminateEngagementJobMocks
