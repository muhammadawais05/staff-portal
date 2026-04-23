import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '../../enabled-operation-mock'

export const getRestoreSendingAwayJobOperationResponse = () => ({
  data: {
    node: {
      __typename: 'Job',
      id: encodeEntityId('123', 'Job'),
      operations: {
        resumeSendingJobAway: enabledOperationMock(),
        __typename: 'JobOperations'
      }
    }
  }
})
