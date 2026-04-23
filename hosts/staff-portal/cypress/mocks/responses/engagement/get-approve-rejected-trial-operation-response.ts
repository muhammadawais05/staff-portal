import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '../../enabled-operation-mock'

export const getApproveRejectedTrialOperationResponse = () => ({
  data: {
    node: {
      __typename: 'Engagement',
      id: encodeEntityId('123', 'Engagement'),
      operations: {
        approveRejectedEngagementTrial: enabledOperationMock(),
        __typename: 'EngagementOperations'
      }
    }
  }
})
