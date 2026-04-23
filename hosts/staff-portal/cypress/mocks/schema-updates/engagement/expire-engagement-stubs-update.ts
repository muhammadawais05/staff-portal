import { Engagement, EngagementStatus } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '~integration/mocks'
import { getEngagementOperations } from '~integration/mocks/fragments/get-engagement-operations'
import { successMutationMock } from '~integration/mocks/mutations'
import { engagementPageStubs } from '~integration/mocks/request-stubs'
import {
  getEmailContactsResponse,
  getTeamsWithEmailTrackingResponse
} from '~integration/mocks/responses'

const updateExpireEngagementStubs = (engagement?: Partial<Engagement>) => {
  cy.stubGraphQLRequests({
    ...engagementPageStubs({
      status: EngagementStatus.PENDING_EXPIRATION,
      operations: getEngagementOperations({
        expireEngagement: enabledOperationMock()
      }),
      ...engagement
    }),
    GetLazyOperation: {
      data: {
        node: {
          __typename: 'Engagement',
          id: encodeEntityId('123', 'Engagement'),
          operations: {
            expireEngagement: enabledOperationMock(),
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
    ExpireEngagement: {
      data: {
        expireEngagement: successMutationMock()
      }
    }
  })
}

export default updateExpireEngagementStubs
