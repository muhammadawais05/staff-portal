import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '../../enabled-operation-mock'

export const getUpdateBillingCycleOperationResponse = () => ({
  data: {
    node: {
      __typename: 'Engagement',
      id: encodeEntityId('123', 'Engagement'),
      operations: {
        changeProductBillingFrequency: enabledOperationMock(),
        __typename: 'EngagementOperations'
      }
    }
  }
})
