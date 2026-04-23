import { FeedbackOperations } from '@staff-portal/graphql/staff'

import { hiddenOperationMock } from '../hidden-operation-mock'

export const feedbackOperationsMock = (
  operations?: Partial<FeedbackOperations>
) => ({
  __typename: 'FeedbackOperations',
  createFeedbackClientAnswers: hiddenOperationMock(),
  createFeedbackMatcherAnswers: hiddenOperationMock(),
  markOutdatedFeedback: hiddenOperationMock(),
  updateFeedbackComment: hiddenOperationMock(),
  updateFeedbackReason: hiddenOperationMock(),
  ...operations
})
