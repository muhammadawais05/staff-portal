import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '~integration/mocks'

export const getChangeEngagementStartDateOperationResponse = () => ({
  data: {
    node: {
      __typename: 'Engagement',
      id: encodeEntityId('123', 'Engagement'),
      operations: {
        changeEngagementStartDate: enabledOperationMock(),
        __typename: 'EngagementOperations'
      }
    }
  }
})
