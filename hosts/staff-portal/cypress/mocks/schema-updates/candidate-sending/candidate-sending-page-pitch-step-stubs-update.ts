import { candidateSendingPageStubs } from '~integration/mocks/request-stubs'
import {
  getPitchStepDataResponse,
  getDeleteStaleDraftTalentPitchResponse
} from '~integration/mocks/responses'

const updateCandidateSendingPagePitchStepStubs = () =>
  cy.stubGraphQLRequests({
    ...candidateSendingPageStubs(),
    DeleteStaleDraftTalentPitch: getDeleteStaleDraftTalentPitchResponse(),
    GetPitchStepData: getPitchStepDataResponse()
  })

export default updateCandidateSendingPagePitchStepStubs
