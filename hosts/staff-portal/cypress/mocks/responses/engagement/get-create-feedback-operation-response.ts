import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '../../enabled-operation-mock'

export const getCreateFeedbackOperationResponse = () => ({
  data: {
    node: {
      __typename: 'Feedback',
      id: encodeEntityId('123', 'Feedback'),
      operations: {
        createFeedbackClientAnswers: enabledOperationMock(),
        createFeedbackMatcherAnswers: enabledOperationMock(),
        __typename: 'FeedbackOperations'
      }
    }
  }
})
