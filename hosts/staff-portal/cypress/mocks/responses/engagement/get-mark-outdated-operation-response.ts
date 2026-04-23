import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '../../enabled-operation-mock'

export const getMarkOutdatedFeedbackOperationResponse = () => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Feedback'),
      operations: {
        markOutdatedFeedback: enabledOperationMock(),
        __typename: 'FeedbackOperations'
      },
      __typename: 'Feedback'
    }
  }
})
