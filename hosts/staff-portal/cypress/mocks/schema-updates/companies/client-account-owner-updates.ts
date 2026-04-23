import { Client } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import {
  clientBasicInfoMock,
  rolesV2Mock,
  staffNodeMock
} from '~integration/mocks/fragments'
import { successOperationMock } from '~integration/mocks/operations'

const updateClientAccountOwnerMocks = (
  client: Partial<Client> = {},
  experiments = {}
) =>
  cy.updateStaffMocks({
    Query: {
      staffNode: staffNodeMock,
      node: () => clientBasicInfoMock(client),
      rolesV2: rolesV2Mock,
      verticals: () => ({ nodes: [] }),
      experiments: () => ({
        ...experiments
      })
    },
    Mutation: {
      updateClientAccountOwner: () =>
        successOperationMock({
          accountOwner: {
            id: encodeEntityId('9', 'Staff'),
            fullName: 'James Holden',
            webResource: {
              text: 'James Holden',
              url: 'https://staging.toptal.net/platform/staff/staff/123456'
            }
          }
        })
    }
  })

export default updateClientAccountOwnerMocks
