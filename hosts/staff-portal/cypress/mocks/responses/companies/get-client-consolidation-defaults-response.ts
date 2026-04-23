import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Client } from '@staff-portal/graphql/staff'

export const getClientConsolidationDefaultsResponse = (
  client?: Partial<Client>
) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Client'),
      consolidationDefaults: {
        nodes: [],
        __typename: 'ConsolidationDefaultsConnection'
      },
      ...client,
      __typename: 'Client'
    }
  }
})
