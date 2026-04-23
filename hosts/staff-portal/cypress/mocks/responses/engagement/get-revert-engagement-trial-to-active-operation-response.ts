import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '../../enabled-operation-mock'

export const getRevertEngagementTrialToActiveOperationResponse = () => ({
  data: {
    node: {
      __typename: 'Engagement',
      id: encodeEntityId('123', 'Engagement'),
      operations: {
        revertEngagementTrialToActive: enabledOperationMock(),
        __typename: 'EngagementOperations'
      }
    }
  }
})
