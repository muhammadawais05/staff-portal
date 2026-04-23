import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import { FeedbackAnswerFragment } from './feedback-answer-fragment.staff.gql.types'

export const createFeedbackAnswerMock = (
  answer: Partial<FeedbackAnswerFragment> = {},
  performer?: FeedbackAnswerFragment['performer']
): FeedbackAnswerFragment => ({
  id: 'feedback-answer-id',
  option: {
    id: 'feedback-answer-option-id',
    question: {
      id: 'feedback-question-id',
      label: 'Feedback Question'
    }
  },
  operations: {
    updateFeedbackAnswer: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    }
  },
  performer,
  ...answer
})
