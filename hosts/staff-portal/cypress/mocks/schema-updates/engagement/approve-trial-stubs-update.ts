import { Engagement, EngagementStatus } from '@staff-portal/graphql/staff'
import { EngagementCumulativeStatus } from '@staff-portal/engagements'

import { enabledOperationMock } from '../../enabled-operation-mock'
import { getEngagementOperations } from '../../fragments/get-engagement-operations'
import { engagementPageStubs } from '../../request-stubs'
import {
  getApproveEngagementTrialOperationResponse,
  getApproveEngagementTrialResponse
} from '../../responses'

const updateApproveTrialStubs = (engagement?: Partial<Engagement>) => {
  cy.stubGraphQLRequests({
    ...engagementPageStubs({
      cumulativeStatus: EngagementCumulativeStatus.ON_TRIAL,
      status: EngagementStatus.ON_TRIAL,
      operations: getEngagementOperations({
        approveEngagementTrial: enabledOperationMock()
      }),
      ...engagement
    }),
    ApproveEngagementTrial: getApproveEngagementTrialResponse(),
    GetLazyOperation: getApproveEngagementTrialOperationResponse()
  })
}

export default updateApproveTrialStubs
