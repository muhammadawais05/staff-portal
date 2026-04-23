import { candidateSendingPageStubs } from '~integration/mocks/request-stubs'
import {
  getCreateTalentRejectionFeedbackResponse,
  getCandidateSendingEngagementResponse
} from '~integration/mocks/responses'

const updateCandidateSendingPageNextStepStubs = () =>
  cy.stubGraphQLRequests({
    ...candidateSendingPageStubs(),
    CreateTalentRejectionFeedback: getCreateTalentRejectionFeedbackResponse(),
    GetCandidateSendingEngagement: getCandidateSendingEngagementResponse()
  })

export default updateCandidateSendingPageNextStepStubs
