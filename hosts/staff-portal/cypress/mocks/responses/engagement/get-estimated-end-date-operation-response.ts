import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '../../enabled-operation-mock'

export const getEstimatedEndDateOperationResponse = () => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Engagement'),
      operations: {
        proposedEngagementEnd: enabledOperationMock(),
        __typename: 'EngagementOperations'
      },
      __typename: 'Engagement'
    }
  }
})
