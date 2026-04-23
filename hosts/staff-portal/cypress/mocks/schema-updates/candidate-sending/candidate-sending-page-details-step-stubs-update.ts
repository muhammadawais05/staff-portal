import { candidateSendingPageStubs } from '~integration/mocks/request-stubs'
import { getDetailsStepDataResponse } from '~integration/mocks/responses'

const updateCandidateSendingPageDetailsStepStubs = () =>
  cy.stubGraphQLRequests({
    ...candidateSendingPageStubs(),
    GetDetailsStepData: getDetailsStepDataResponse()
  })

export default updateCandidateSendingPageDetailsStepStubs
