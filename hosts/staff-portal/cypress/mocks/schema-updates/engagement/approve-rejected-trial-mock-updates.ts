import { Engagement, EngagementStatus } from '@staff-portal/graphql/staff'
import { EngagementCumulativeStatus } from '@staff-portal/engagements'

import { engagementPageStubs } from '~integration/mocks/request-stubs'
import { enabledOperationMock } from '../../enabled-operation-mock'
import { getEngagementOperations } from '~integration/mocks/fragments/get-engagement-operations'
import { successMutationMock } from '~integration/mocks/mutations'
import { getApproveRejectedTrialOperationResponse } from '~integration/mocks/responses'

const updateApproveRejectedTrialMocks = (engagement?: Partial<Engagement>) =>
  cy.stubGraphQLRequests({
    ...engagementPageStubs({
      cumulativeStatus: EngagementCumulativeStatus.REJECTED_TRIAL,
      status: EngagementStatus.REJECTED_TRIAL,
      operations: getEngagementOperations({
        approveRejectedEngagementTrial: enabledOperationMock()
      }),
      ...engagement
    }),
    GetLazyOperation: getApproveRejectedTrialOperationResponse(),
    ApproveRejectedEngagementTrial: {
      data: {
        approveRejectedEngagementTrial: successMutationMock()
      }
    }
  })

export default updateApproveRejectedTrialMocks
