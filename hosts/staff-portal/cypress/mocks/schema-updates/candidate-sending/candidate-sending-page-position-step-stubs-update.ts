import { candidateSendingPageStubs } from '~integration/mocks/request-stubs'
import {
  getClientAvailabilityRequestsResponse,
  getCompanyAutocompleteResponse,
  getPositionStepDataResponse,
  getBaseRoleTitleDataResponse,
  getTalentAutocompleteResponse
} from '~integration/mocks/responses'

const updateCandidateSendingPagePositionStepStubs = () =>
  cy.stubGraphQLRequests({
    ...candidateSendingPageStubs(),
    GetClientAutocomplete: getCompanyAutocompleteResponse(),
    GetClientAvailabilityRequests: getClientAvailabilityRequestsResponse(),
    GetPositionStepData: getPositionStepDataResponse(),
    GetRoleTitleData: getBaseRoleTitleDataResponse(),
    GetTalentAutocomplete: getTalentAutocompleteResponse()
  })

export default updateCandidateSendingPagePositionStepStubs
