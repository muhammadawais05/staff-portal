import { Client } from '@staff-portal/graphql/staff'

import { successOperationMock } from '~integration/mocks/operations'
import { companiesTopscreenTabStubs } from '~integration/mocks/request-stubs/companies/tabs'

const updateTopscreenPositionStubs = (client?: Partial<Client>) => {
  cy.stubGraphQLRequests({
    ...companiesTopscreenTabStubs(client)
  })
  cy.updateStaffMocks({
    Mutation: {
      createTopscreenPosition: successOperationMock,
      activateTopscreenPosition: successOperationMock
    }
  })
}

export default updateTopscreenPositionStubs
