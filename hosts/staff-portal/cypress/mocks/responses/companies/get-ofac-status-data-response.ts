import { encodeEntityId } from '@staff-portal/data-layer-service'
import {
  Client,
  ClientCumulativeStatus,
  OfacStatus
} from '@staff-portal/graphql/staff'

import { enabledOperationMock } from '~integration/mocks'

export const getOfacStatusDataResponse = (client?: Partial<Client>) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Client'),
      fullName: 'DuBuque, Cruickshank and Volkman',
      clientCumulativeStatus: ClientCumulativeStatus.PENDING_TOS,
      ofacStatus: OfacStatus.NORMAL,
      ofacStatusChanges: {
        nodes: [],
        __typename: 'OfacStatusChangeConnection'
      },
      clientAssociatedRoles: {
        nodes: [],
        __typename: 'RoleOrClientConnection'
      },
      operations: {
        updateClientOfacStatus: enabledOperationMock(),
        __typename: 'Operation'
      },
      __typename: 'ClientOperations'
    },
    ...client,
    __typename: 'Client'
  }
})
