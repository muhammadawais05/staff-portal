import { Client } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '~integration/mocks/enabled-operation-mock'
import { successOperationMock } from '~integration/mocks/operations'
import { companiesTopscreenTabStubs } from '~integration/mocks/request-stubs/companies/tabs'

const activateTopscreenPositionStubs = (client?: Partial<Client>) => {
  const getLazyOperations = {
    GetLazyOperation: {
      data: {
        node: {
          id: encodeEntityId('position-123', 'TopscreenPosition'),
          operations: {
            activateTopscreenPosition: enabledOperationMock(),
            createTopscreenPosition: enabledOperationMock()
          },
          __typename: 'TopscreenPosition'
        }
      }
    }
  }

  cy.stubGraphQLRequests({
    ...companiesTopscreenTabStubs(client)
  })
  cy.stubGraphQLRequests({
    ...getLazyOperations
  })
  cy.updateStaffMocks({
    Mutation: {
      activateTopscreenPosition: successOperationMock
    }
  })
}

export default activateTopscreenPositionStubs
