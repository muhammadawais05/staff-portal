import { Client } from '@staff-portal/graphql/staff'

import {
  clientBasicInfoMock,
  rolesV2Mock,
  staffNodeMock
} from '~integration/mocks/fragments'
import { successOperationMock } from '~integration/mocks/operations'

const updateRequestTransferMocks = (client: Partial<Client> = {}) =>
  cy.updateStaffMocks({
    Query: {
      staffNode: staffNodeMock,
      node: () => clientBasicInfoMock(client),
      rolesV2: rolesV2Mock,
      verticals: () => ({ nodes: [] })
    },
    Mutation: {
      requestClientAccountManagerTransfer: successOperationMock
    }
  })

export default updateRequestTransferMocks
