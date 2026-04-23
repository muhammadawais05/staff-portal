import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '~integration/mocks'

export const getChangeEngagementEndDateOperationResponse = () => ({
  data: {
    node: {
      __typename: 'Engagement',
      id: encodeEntityId('123', 'Engagement'),
      operations: {
        changeEngagementEndDate: enabledOperationMock(),
        __typename: 'EngagementOperations'
      }
    }
  }
})
