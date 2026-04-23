import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '../../enabled-operation-mock'

export const getCancelEngagementTrialOperationResponse = () => ({
  data: {
    node: {
      __typename: 'Engagement',
      id: encodeEntityId('123', 'Engagement'),
      operations: {
        cancelEngagementTrial: enabledOperationMock(),
        __typename: 'EngagementOperations'
      }
    }
  }
})
