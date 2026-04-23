import { encodeEntityId } from '@staff-portal/data-layer-service'
import { CallbackRequest } from '@staff-portal/graphql/staff'

import { callRequestsPageStubs } from '~integration/mocks/request-stubs'
import { successMutationMock } from '~integration/mocks/mutations'
import { getCallRequestOperationsMock } from '~integration/mocks/fragments'

const updateCallRequestsPageStubs = (callRequest?: Partial<CallbackRequest>) =>
  cy.stubGraphQLRequests({
    ...callRequestsPageStubs(callRequest),
    GetLazyOperation: {
      data: {
        node: {
          id: encodeEntityId('123', 'CallbackRequest'),
          operations: getCallRequestOperationsMock(callRequest?.operations),
          __typename: 'CallbackRequest'
        }
      }
    },
    ClaimCallbackRequestWithClient: {
      data: {
        claimCallbackRequestWithClient: successMutationMock({
          callbackRequest: {
            id: encodeEntityId('123', 'CallbackRequest'),
            client: {
              id: 'VjEtQ2xpZW50LTYxODI0Nw',
              webResource: {
                url: 'https://staging.toptal.net/platform/staff/engagements/123'
              }
            },
            __typename: 'CallbackRequest'
          }
        })
      }
    },
    ClaimCallbackRequest: {
      data: {
        claimCallbackRequest: successMutationMock({
          callbackRequest: {
            id: encodeEntityId('123', 'CallbackRequest'),
            client: {
              id: 'VjEtQ2xpZW50LTYxODI0Nw',
              webResource: {
                url: 'https://staging.toptal.net/platform/staff/engagements/123'
              }
            },
            __typename: 'CallbackRequest'
          }
        })
      }
    },
    RemoveCallbackRequest: {
      data: {
        removeCallbackRequest: successMutationMock({
          callbackRequest: {
            id: encodeEntityId('123', 'CallbackRequest'),
            status: 'removed',
            __typename: 'CallbackRequest'
          }
        })
      }
    }
  })

export default updateCallRequestsPageStubs
