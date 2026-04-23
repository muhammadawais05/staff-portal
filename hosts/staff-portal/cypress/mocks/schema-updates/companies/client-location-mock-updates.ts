import { Client } from '@staff-portal/graphql/staff'

import { countriesMock } from '~integration/mocks/countries-mock'
import {
  clientBasicInfoMock,
  staffNodeMock
} from '~integration/mocks/fragments'
import { successOperationMock } from '~integration/mocks/operations'

const updateClientProfileLocationMocks = (
  client?: Partial<Client> | undefined
) =>
  cy.updateStaffMocks({
    Query: {
      staffNode: staffNodeMock,
      node: clientBasicInfoMock,
      countries: () => ({
        nodes: countriesMock()
      })
    },
    Mutation: {
      patchClientProfile: () =>
        successOperationMock(clientBasicInfoMock(client))
    }
  })

export default updateClientProfileLocationMocks
