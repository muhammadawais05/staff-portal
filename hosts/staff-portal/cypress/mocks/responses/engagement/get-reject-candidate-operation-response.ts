import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '../../enabled-operation-mock'

export const getRejectCandidateOperationResponse = () => ({
  data: {
    node: {
      __typename: 'Engagement',
      id: encodeEntityId('123', 'Engagement'),
      operations: {
        rejectEngagementOnInterview: enabledOperationMock(),
        __typename: 'EngagementOperations'
      }
    }
  }
})
