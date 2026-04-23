import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '../../enabled-operation-mock'

export const getRejectEngagementTrialOperationResponse = () => ({
  data: {
    node: {
      __typename: 'Engagement',
      id: encodeEntityId('123', 'Engagement'),
      operations: {
        rejectEngagementTrial: enabledOperationMock(),
        __typename: 'EngagementOperations'
      }
    }
  }
})
