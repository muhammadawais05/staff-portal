import { Client } from '@staff-portal/graphql/staff'

import {
  availableTimezonesMock,
  clientBasicInfoMock,
  staffNodeMock
} from '~integration/mocks/fragments'
import { successOperationMock } from '~integration/mocks/operations'

const updateClientTimeZoneMocks = (client?: Partial<Client>) =>
  cy.updateStaffMocks({
    Query: {
      staffNode: staffNodeMock,
      node: clientBasicInfoMock,
      availableTimeZones: availableTimezonesMock
    },
    Mutation: {
      patchClientProfile: () =>
        successOperationMock(clientBasicInfoMock(client))
    }
  })

export default updateClientTimeZoneMocks
