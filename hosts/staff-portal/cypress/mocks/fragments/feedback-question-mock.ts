import { FeedbackQuestion } from '@staff-portal/graphql/staff'

export const feedbackQuestionMock = (
  feedbackQuestion?: Partial<FeedbackQuestion>
): FeedbackQuestion => ({
  id: '1',
  identifier: 'question-1',
  options: {
    nodes: [
      {
        id: '1',
        question: {
          id: '1',
          identifier: 'option-1'
        },
        value: 'Option 1'
      }
    ]
  },
  ...feedbackQuestion
})
