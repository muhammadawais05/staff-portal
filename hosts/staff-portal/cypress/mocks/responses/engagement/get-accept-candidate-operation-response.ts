import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '../../enabled-operation-mock'

export const getAcceptCandidateOperationResponse = () => ({
  data: {
    node: {
      __typename: 'Engagement',
      id: encodeEntityId('123', 'Engagement'),
      operations: {
        scheduleEngagementActivationStartDate: enabledOperationMock(),
        __typename: 'EngagementOperations'
      }
    }
  }
})
