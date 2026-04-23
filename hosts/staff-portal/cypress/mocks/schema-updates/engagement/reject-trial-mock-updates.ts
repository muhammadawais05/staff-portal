import { Engagement, EngagementStatus } from '@staff-portal/graphql/staff'
import { EngagementCumulativeStatus } from '@staff-portal/engagements'

import { engagementPageStubs } from '~integration/mocks/request-stubs'
import { getEngagementOperations } from '~integration/mocks/fragments/get-engagement-operations'
import { enabledOperationMock } from '../../enabled-operation-mock'
import { getRejectEngagementTrialOperationResponse } from '~integration/mocks/responses'
import { successMutationMock } from '~integration/mocks/mutations'

const updateRejectTrialMocks = (engagement?: Partial<Engagement>) =>
  cy.stubGraphQLRequests({
    ...engagementPageStubs({
      cumulativeStatus: EngagementCumulativeStatus.ON_TRIAL,
      status: EngagementStatus.ON_TRIAL,
      operations: getEngagementOperations({
        rejectEngagementTrial: enabledOperationMock()
      }),
      ...engagement
    }),
    GetLazyOperation: getRejectEngagementTrialOperationResponse(),
    RejectEngagementTrial: {
      data: {
        rejectEngagementTrial: successMutationMock()
      }
    }
  })

export default updateRejectTrialMocks
