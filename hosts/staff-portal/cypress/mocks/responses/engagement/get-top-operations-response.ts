import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '../../enabled-operation-mock'

export const getTopOperationsResponse = () => ({
  data: {
    node: {
      __typename: 'Engagement',
      id: encodeEntityId('123', 'Engagement'),
      operations: {
        sendTop: enabledOperationMock(),
        importTop: enabledOperationMock(),
        importContractAsTop: enabledOperationMock(),
        __typename: 'EngagementOperations'
      }
    }
  }
})
