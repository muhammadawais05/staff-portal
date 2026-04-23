import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '../../enabled-operation-mock'

export const getApproveEngagementTrialOperationResponse = () => ({
  data: {
    node: {
      __typename: 'Engagement',
      id: encodeEntityId('123', 'Engagement'),
      operations: {
        approveEngagementTrial: enabledOperationMock(),
        __typename: 'EngagementOperations'
      }
    }
  }
})
