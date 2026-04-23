import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '../../enabled-operation-mock'

export const getAddActivityOperationResponse = () => ({
  data: {
    node: {
      __typename: 'Client',
      id: encodeEntityId('123', 'Client'),
      operations: {
        createActivity: enabledOperationMock(),
        __typename: 'ClientOperations'
      }
    }
  }
})
