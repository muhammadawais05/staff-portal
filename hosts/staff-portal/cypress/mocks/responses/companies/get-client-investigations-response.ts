import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Client } from '@staff-portal/graphql/staff'

import { getClientOperations } from '~integration/mocks/fragments'

export const getClientInvestigationsResponse = (client?: Partial<Client>) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Client'),
      fullName: 'DuBuque, Cruickshank and Volkman',
      roleFlags: {
        nodes: [
          {
            id: 'VjEtUm9sZUZsYWctMjk1MDM1',
            flag: {
              id: 'VjEtRmxhZy0xMjExNDk',
              token: 'migrated_enterprise_account',
              __typename: 'Flag'
            },
            __typename: 'RoleFlag'
          }
        ],
        __typename: 'RoleFlagConnection'
      },
      investigations: {
        totalCount: 0,
        nodes: [],
        __typename: 'ClientInvestigationConnection'
      },
      operations: getClientOperations(),
      ...client,
      __typename: 'Client'
    }
  }
})
