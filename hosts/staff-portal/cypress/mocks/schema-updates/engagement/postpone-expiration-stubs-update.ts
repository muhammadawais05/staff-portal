import { Engagement, EngagementStatus } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'
import { EngagementCumulativeStatus } from '@staff-portal/engagements'

import { enabledOperationMock } from '~integration/mocks'
import { getEngagementOperations } from '~integration/mocks/fragments/get-engagement-operations'
import { successMutationMock } from '~integration/mocks/mutations'
import { engagementPageStubs } from '~integration/mocks/request-stubs'
import {
  getEmailContactsResponse,
  getTeamsWithEmailTrackingResponse
} from '~integration/mocks/responses'

const updatePostponeExpirationStubs = (engagement?: Partial<Engagement>) => {
  cy.stubGraphQLRequests({
    ...engagementPageStubs({
      cumulativeStatus: EngagementCumulativeStatus.PENDING_EXPIRATION,
      status: EngagementStatus.PENDING_EXPIRATION,
      operations: getEngagementOperations({
        postponeEngagementExpiration: enabledOperationMock()
      }),
      ...engagement
    }),
    GetLazyOperation: {
      data: {
        node: {
          __typename: 'Engagement',
          id: encodeEntityId('123', 'Engagement'),
          operations: {
            postponeEngagementExpiration: enabledOperationMock(),
            __typename: 'EngagementOperations'
          }
        }
      }
    },
    GetUnfilledCallsCount: {
      data: {
        viewer: {
          calls: {
            totalCount: 0,
            __typename: 'CallsConnection'
          },
          __typename: 'Viewer'
        }
      }
    },
    GetTeamsWithEmailTracking: getTeamsWithEmailTrackingResponse(),
    GetEmailContacts: getEmailContactsResponse(),
    PostponeEngagementExpiration: {
      data: {
        postponeEngagementExpiration: successMutationMock()
      }
    }
  })
}

export default updatePostponeExpirationStubs
