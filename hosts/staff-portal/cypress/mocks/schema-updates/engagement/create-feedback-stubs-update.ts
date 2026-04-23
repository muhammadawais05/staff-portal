import { Feedback } from '@staff-portal/graphql/staff'

import { getFeedbackMock } from '~integration/mocks/fragments'
import { engagementPageStubs } from '~integration/mocks/request-stubs'
import {
  getCreateFeedbackClientAnswersResponse,
  getCreateFeedbackMatcherAnswersResponse,
  getCreateFeedbackOperationResponse,
  getLeaveClientFeedbackDataResponse,
  getLeaveMatcherFeedbackDataResponse
} from '~integration/mocks/responses'

const updateCreateFeedbackStubs = () => {
  cy.stubGraphQLRequests({
    ...engagementPageStubs({
      feedbacks: { totalCount: 1, nodes: [getFeedbackMock() as Feedback] }
    }),
    GetLazyOperation: getCreateFeedbackOperationResponse(),
    GetLeaveClientFeedbackData: getLeaveClientFeedbackDataResponse(),
    GetLeaveMatcherFeedbackData: getLeaveMatcherFeedbackDataResponse(),
    CreateFeedbackClientAnswers: getCreateFeedbackClientAnswersResponse(),
    CreateFeedbackMatcherAnswers: getCreateFeedbackMatcherAnswersResponse()
  })
}

export default updateCreateFeedbackStubs
