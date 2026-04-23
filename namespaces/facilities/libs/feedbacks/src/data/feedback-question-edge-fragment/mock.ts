import { FeedbackQuestionEdgeFragment } from './feedback-question-edge-fragment.staff.gql.types'

export const createFeedbackQuestionEdgeMock = ({
  node,
  text = 'Question Text'
}: Partial<
  FeedbackQuestionEdgeFragment
> = {}): FeedbackQuestionEdgeFragment => ({
  node: {
    id: '1',
    identifier: 'identifier',
    ...node
  },
  text
})
