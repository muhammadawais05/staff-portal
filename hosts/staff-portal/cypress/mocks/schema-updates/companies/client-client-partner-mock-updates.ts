import { Client } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import {
  clientBasicInfoMock,
  rolesV2Mock,
  staffNodeMock
} from '~integration/mocks/fragments'

const updateClientPartnerMocks = (client?: Partial<Client>) =>
  cy.updateStaffMocks({
    Query: {
      staffNode: staffNodeMock,
      node: () => clientBasicInfoMock(client),
      rolesV2: rolesV2Mock,
      verticals: () => ({ nodes: [] })
    },
    Mutation: {
      selectClientClientPartner: () => ({
        success: true,
        errors: [],
        client: { clientPartner: null } as Client,
        cascadeUpdateInfo: {
          clientsToUpdateCount: 10,
          opportunitiesToUpdateCount: 10
        }
      }),
      updateClientClientPartner: () => ({
        success: true,
        errors: [],
        client: {
          id: 'VjEtQ2xpZW50LTUyODg4NQ',
          clientPartner: {
            id: encodeEntityId('3', 'Staff'),
            fullName: 'Charles Boyle',
            webResource: {
              text: 'Charles Boyle',
              url: 'https://staging.toptal.net/platform/staff/staff/123456'
            }
          }
        } as unknown as Client,
        updatedClients: [clientBasicInfoMock() as Client]
      })
    }
  })

export default updateClientPartnerMocks
