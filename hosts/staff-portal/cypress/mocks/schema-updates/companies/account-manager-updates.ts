import { Client } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import {
  clientBasicInfoMock,
  rolesV2Mock,
  staffNodeMock
} from '~integration/mocks/fragments'
import { successOperationMock } from '~integration/mocks/operations'

const updateAccountManagerMocks = (client: Partial<Client> = {}) =>
  cy.updateStaffMocks({
    Query: {
      staffNode: staffNodeMock,
      node: () => clientBasicInfoMock(client),
      rolesV2: rolesV2Mock,
      verticals: () => ({ nodes: [] })
    },
    Mutation: {
      updateAccountManager: () =>
        successOperationMock({
          accountManager: {
            id: encodeEntityId('3', 'Staff'),
            fullName: 'Charles Boyle',
            webResource: {
              text: 'Charles Boyle',
              url: 'https://staging.toptal.net/platform/staff/staff/123456'
            }
          }
        })
    }
  })

export default updateAccountManagerMocks
