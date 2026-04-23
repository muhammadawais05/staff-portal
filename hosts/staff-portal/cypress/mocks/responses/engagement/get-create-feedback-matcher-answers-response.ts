import { feedbackMock } from '~integration/mocks/fragments'

export const getCreateFeedbackMatcherAnswersResponse = () => ({
  data: {
    createFeedbackMatcherAnswers: {
      feedback: feedbackMock(),
      success: true,
      errors: [],
      __typename: 'CreateFeedbackMatcherAnswersPayload'
    }
  }
})
