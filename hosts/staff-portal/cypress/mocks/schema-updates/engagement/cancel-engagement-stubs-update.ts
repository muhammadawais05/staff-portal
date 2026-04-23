import { Engagement, EngagementStatus } from '@staff-portal/graphql/staff'
import { EngagementCumulativeStatus } from '@staff-portal/engagements'

import { engagementPageStubs } from '~integration/mocks/request-stubs'
import { getCancelEngagementTrialOperationResponse } from '~integration/mocks/responses'
import { enabledOperationMock } from '../../enabled-operation-mock'
import { getEngagementOperations } from '../../fragments/get-engagement-operations'
import { successMutationMock } from '../../mutations'

const updateCancelEngagementStubs = (engagement?: Partial<Engagement>) =>
  cy.stubGraphQLRequests({
    ...engagementPageStubs({
      cumulativeStatus: EngagementCumulativeStatus.ON_TRIAL,
      status: EngagementStatus.ON_TRIAL,
      operations: getEngagementOperations({
        cancelEngagementTrial: enabledOperationMock()
      }),
      ...engagement
    }),
    GetLazyOperation: getCancelEngagementTrialOperationResponse(),
    CancelEngagement: {
      data: {
        cancelEngagementTrial: successMutationMock()
      }
    }
  })

export default updateCancelEngagementStubs
