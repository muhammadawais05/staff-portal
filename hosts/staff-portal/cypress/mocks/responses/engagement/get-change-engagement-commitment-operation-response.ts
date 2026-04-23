import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '~integration/mocks'

export const getChangeEngagementCommitmentOperationResponse = () => ({
  data: {
    node: {
      __typename: 'Engagement',
      id: encodeEntityId('123', 'Engagement'),
      operations: {
        changeEngagementCommitment: enabledOperationMock(),
        __typename: 'EngagementOperations'
      }
    }
  }
})
