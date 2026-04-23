import { createFeedbackMock } from '../feedback-details-fragment/mock'
import { FeedbackWithAnswersFragment } from './feedback-with-answers-fragment.staff.gql.types'

export const createFeedbackWithAnswersMock = (
  feedback: Partial<FeedbackWithAnswersFragment> = {}
): FeedbackWithAnswersFragment => {
  const feedbackMock = createFeedbackMock(feedback)

  return {
    ...feedbackMock,
    clientQuestions: { nodes: [] },
    matcherQuestions: { nodes: [] },
    additionalQuestions: true,
    clientAnswers: { nodes: [] },
    matcherAnswers: { nodes: [] },
    talentAnswers: { nodes: [] },
    ...feedback
  }
}
