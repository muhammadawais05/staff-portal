import { Client } from '@staff-portal/graphql/staff'

import {
  clientBasicInfoMock,
  staffNodeMock
} from '~integration/mocks/fragments'
import { successOperationMock } from '~integration/mocks/operations'

const updateClientActualSignDate = (client?: Partial<Client>) =>
  cy.updateStaffMocks({
    Query: {
      staffNode: staffNodeMock,
      node: clientBasicInfoMock
    },
    Mutation: {
      updateClientActualSignDate: () =>
        successOperationMock(clientBasicInfoMock(client))
    }
  })

export default updateClientActualSignDate
