import { Engagement, EngagementStatus } from '@staff-portal/graphql/staff'
import { EngagementCumulativeStatus } from '@staff-portal/engagements'

import { engagementPageStubs } from '~integration/mocks/request-stubs'
import { getEngagementOperations } from '~integration/mocks/fragments/get-engagement-operations'
import { enabledOperationMock } from '../../enabled-operation-mock'
import { getRevertEngagementTrialToActiveOperationResponse } from '~integration/mocks/responses'
import { successMutationMock } from '~integration/mocks/mutations'

const updateRevertToTrialMocks = (engagement?: Partial<Engagement>) =>
  cy.stubGraphQLRequests({
    ...engagementPageStubs({
      cumulativeStatus: EngagementCumulativeStatus.ACTIVE,
      status: EngagementStatus.ACTIVE,
      operations: getEngagementOperations({
        revertEngagementTrialToActive: enabledOperationMock()
      }),
      ...engagement
    }),
    GetLazyOperation: getRevertEngagementTrialToActiveOperationResponse(),
    RevertEngagementTrialToActive: {
      data: {
        revertEngagementTrialToActive: successMutationMock()
      }
    }
  })

export default updateRevertToTrialMocks
