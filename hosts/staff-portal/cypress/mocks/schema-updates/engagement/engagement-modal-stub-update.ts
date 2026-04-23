import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '~integration/mocks'

const updateEngagementModalStubs = (operationName: string) => {
  cy.stubGraphQLRequests({
    GetLazyOperation: {
      data: {
        node: {
          id: encodeEntityId('123', 'Engagement'),
          operations: {
            [operationName]: enabledOperationMock(),
            __typename: 'EngagementOperations'
          },
          __typename: 'Engagement'
        }
      }
    }
  })
}

export default updateEngagementModalStubs
