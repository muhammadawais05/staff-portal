import { Engagement, EngagementStatus } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'
import { EngagementCumulativeStatus } from '@staff-portal/engagements'

import { enabledOperationMock } from '~integration/mocks'
import { getEngagementOperations } from '~integration/mocks/fragments/get-engagement-operations'
import { successMutationMock } from '~integration/mocks/mutations'
import { engagementPageStubs } from '~integration/mocks/request-stubs'

const updateReopenExpiredEngagementMocks = (engagement?: Partial<Engagement>) =>
  cy.stubGraphQLRequests({
    ...engagementPageStubs({
      cumulativeStatus: EngagementCumulativeStatus.CLOSED,
      status: EngagementStatus.CLOSED,
      operations: getEngagementOperations({
        reopenExpiredEngagement: enabledOperationMock()
      }),
      ...engagement
    }),
    GetLazyOperation: {
      data: {
        node: {
          __typename: 'Engagement',
          id: encodeEntityId('123', 'Engagement'),
          operations: {
            reopenExpiredEngagement: enabledOperationMock(),
            __typename: 'EngagementOperations'
          }
        }
      }
    },
    ReopenExpiredEngagement: {
      data: {
        reopenExpiredEngagement: successMutationMock()
      }
    }
  })

export default updateReopenExpiredEngagementMocks
