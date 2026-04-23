import { EngagementStatus, Engagement, Job } from '@staff-portal/graphql/staff'
import { EngagementCumulativeStatus } from '@staff-portal/engagements'

import { successMutationMock } from '../../mutations'
import { getEngagementOperations } from '../../fragments/get-engagement-operations'
import { enabledOperationMock } from '../../enabled-operation-mock'
import { engagementPageStubs } from '~integration/mocks/request-stubs'
import { getTerminateEngagementOperationResponse } from '~integration/mocks/responses'
import { getFeedbackReasonsResponse } from '~integration/mocks/responses/engagement/get-feedback-reasons-response'

const updateTerminateEngagementStubs = (engagement?: Partial<Engagement>) =>
  cy.stubGraphQLRequests({
    ...engagementPageStubs({
      job: {
        talentCount: 2,
        ...engagement?.job
      } as Job,
      cumulativeStatus: EngagementCumulativeStatus.ACTIVE,
      status: EngagementStatus.ACTIVE,
      operations: getEngagementOperations({
        terminateEngagement: enabledOperationMock()
      }),
      ...engagement
    }),
    GetLazyOperation: getTerminateEngagementOperationResponse(),
    TerminateEngagement: {
      data: {
        terminateEngagement: successMutationMock()
      }
    },
    GetFeedbackReasons: getFeedbackReasonsResponse()
  })

export default updateTerminateEngagementStubs
