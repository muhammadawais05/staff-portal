import { Client } from '@staff-portal/graphql/staff'

import { getClientOperations } from '~integration/mocks/fragments'

export const getTransferRequestResponse = (client?: Partial<Client>) => ({
  data: {
    node: {
      id: 'VjEtQ2xpZW50LTMzNzkzOQ',
      operations: getClientOperations(),
      transferRequests: {
        nodes: [],
        totalCount: 0,
        __typename: 'ClientTransferRoleRequest'
      },
      ...client,
      __typename: 'Client'
    }
  }
})
