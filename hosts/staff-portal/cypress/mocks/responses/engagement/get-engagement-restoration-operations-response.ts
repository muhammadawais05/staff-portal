import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '../../enabled-operation-mock'

export const getEngagementRestorationOperationResponse = () => ({
  data: {
    node: {
      __typename: 'Engagement',
      id: encodeEntityId('123', 'Engagement'),
      operations: {
        restoreExpiredEngagement: enabledOperationMock(),
        restoreRejectedEngagement: enabledOperationMock(),
        restoreCancelledEngagement: enabledOperationMock(),
        __typename: 'EngagementOperations'
      }
    }
  }
})
