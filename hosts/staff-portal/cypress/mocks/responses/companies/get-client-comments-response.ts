import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Client, ClientCumulativeStatus } from '@staff-portal/graphql/staff'

export const getClientCommentsResponse = (client?: Partial<Client>) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Client'),
      commentsAccessible: true,
      cumulativeStatus: ClientCumulativeStatus.PENDING_TOS,
      ...client,
      __typename: 'Client'
    }
  }
})
