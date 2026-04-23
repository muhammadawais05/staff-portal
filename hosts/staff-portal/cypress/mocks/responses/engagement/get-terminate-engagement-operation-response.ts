import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '../../enabled-operation-mock'

export const getTerminateEngagementOperationResponse = () => ({
  data: {
    node: {
      __typename: 'Engagement',
      id: encodeEntityId('123', 'Engagement'),
      operations: {
        terminateEngagement: enabledOperationMock(),
        __typename: 'EngagementOperations'
      }
    }
  }
})
