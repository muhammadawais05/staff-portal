import { candidateSendingPageStubs } from '~integration/mocks/request-stubs'
import {
  getPositionStepDataResponse,
  getSkillsStepDataResponse
} from '~integration/mocks/responses'

const updateCandidateSendingPageSkillsStepStubs = () =>
  cy.stubGraphQLRequests({
    ...candidateSendingPageStubs(),
    GetPositionStepData: getPositionStepDataResponse(),
    GetSkillsStepData: getSkillsStepDataResponse()
  })

export default updateCandidateSendingPageSkillsStepStubs
