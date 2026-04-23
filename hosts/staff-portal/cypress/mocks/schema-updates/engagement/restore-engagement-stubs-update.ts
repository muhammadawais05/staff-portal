import {
  Engagement as EngagementType,
  EngagementOperations,
  EngagementStatus
} from '@staff-portal/graphql/staff'
import { EngagementCumulativeStatus } from '@staff-portal/engagements'

import { successMutationMock } from '~integration/mocks/mutations'
import { enabledOperationMock } from '~integration/mocks/enabled-operation-mock'
import { engagementPageStubs } from '~integration/mocks/request-stubs'
import { getEngagementOperations } from '~integration/mocks/fragments/get-engagement-operations'
import { getEngagementRestorationOperationResponse } from '~integration/mocks/responses'

const updateRestoreEngagementStubs = ({
  engagement,
  operations
}: {
  engagement?: Partial<EngagementType>
  operations?: Partial<EngagementOperations>
} = {}) =>
  cy.stubGraphQLRequests({
    ...engagementPageStubs({
      status: EngagementStatus.EXPIRED,
      cumulativeStatus: EngagementCumulativeStatus.EXPIRED,
      operations: getEngagementOperations({
        restoreExpiredEngagement: enabledOperationMock(),
        restoreRejectedEngagement: enabledOperationMock(),
        restoreCancelledEngagement: enabledOperationMock(),
        ...operations
      }),
      ...engagement
    }),
    GetLazyOperation: getEngagementRestorationOperationResponse(),
    RestoreExpiredEngagement: {
      data: {
        restoreExpiredEngagement: successMutationMock()
      }
    },
    RestoreRejectedEngagement: {
      data: {
        restoreRejectedEngagement: successMutationMock()
      }
    },
    RestoreCancelledEngagement: {
      data: {
        restoreCancelledEngagement: successMutationMock()
      }
    }
  })

export default updateRestoreEngagementStubs
