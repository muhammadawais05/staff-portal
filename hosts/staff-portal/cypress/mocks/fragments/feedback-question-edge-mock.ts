import { FeedbackQuestionEdge } from '@staff-portal/graphql/staff'

export const feedbackQuestionEdgeMock = (
  feedbackQuestionEdge?: Partial<FeedbackQuestionEdge>
): FeedbackQuestionEdge => ({
  text: 'Question 1',
  node: {
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
    }
  },
  ...feedbackQuestionEdge
})
