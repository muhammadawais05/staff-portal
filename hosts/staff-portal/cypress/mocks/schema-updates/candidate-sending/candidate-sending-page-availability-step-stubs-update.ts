import { candidateSendingPageStubs } from '~integration/mocks/request-stubs'
import {
  getAvailabilityStepDataResponse,
  getAvailabilityStepJobCandidateDataResponse,
  getAvailabilityStepTalentAvailabilityDataResponse,
  getAvailabilityStepTalentCandidateDataResponse,
  getSkillsStepDataResponse
} from '~integration/mocks/responses'

const updateCandidateSendingPageAvailabilityStepStubs = () =>
  cy.stubGraphQLRequests({
    ...candidateSendingPageStubs(),
    GetSkillsStepData: getSkillsStepDataResponse(),
    GetAvailabilityStepData: getAvailabilityStepDataResponse(),
    GetAvailabilityStepTalentAvailabilityData:
      getAvailabilityStepTalentAvailabilityDataResponse(),
    GetTalentCandidateData: getAvailabilityStepTalentCandidateDataResponse(),
    GetJobCandidateData: getAvailabilityStepJobCandidateDataResponse()
  })

export default updateCandidateSendingPageAvailabilityStepStubs
