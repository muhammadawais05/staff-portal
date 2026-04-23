import { getFeedbackMock } from '~integration/mocks/fragments'

export const getCreateFeedbackClientAnswersResponse = () => ({
  data: {
    createFeedbackClientAnswers: {
      feedback: getFeedbackMock(),
      success: true,
      errors: [],
      __typename: 'CreateFeedbackClientAnswersPayload'
    }
  }
})
