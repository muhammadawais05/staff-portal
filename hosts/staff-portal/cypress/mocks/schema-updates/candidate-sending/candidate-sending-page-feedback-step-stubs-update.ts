import { candidateSendingPageStubs } from '~integration/mocks/request-stubs'
import {
  getPitchStepDataResponse,
  getSubmitNewEngagementWizardResponse
} from '~integration/mocks/responses'

const updateCandidateSendingPageFeedbackStepStubs = ({
  availabilityRequestId,
  jobApplicationId
}: {
  availabilityRequestId: string
  jobApplicationId: string
}) =>
  cy.stubGraphQLRequests({
    ...candidateSendingPageStubs(),
    GetPitchStepData: getPitchStepDataResponse(),
    SubmitNewEngagementWizard: getSubmitNewEngagementWizardResponse({
      availabilityRequestId,
      jobApplicationId
    })
  })

export default updateCandidateSendingPageFeedbackStepStubs
