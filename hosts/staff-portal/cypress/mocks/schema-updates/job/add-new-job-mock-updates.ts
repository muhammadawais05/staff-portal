import { jobListPageStubs } from '~integration/mocks/request-stubs'
import {
  getClientDataByClientIdResponse,
  getClientDataByRoleIdResponse,
  getCompanyAutocompleteResponse,
  getJobCreateOpportunityResponse,
  getJobCreateVerticalsResponse
} from '~integration/mocks/responses'

const updateAddNewJobMocks = () => {
  cy.stubGraphQLRequests({
    ...jobListPageStubs(),
    GetClientAutocomplete: () => getCompanyAutocompleteResponse(),
    GetClientDataByRoleId: getClientDataByRoleIdResponse(),
    GetClientDataByClientId: getClientDataByClientIdResponse(),
    GetJobCreateOpportunity: getJobCreateOpportunityResponse(),
    GetJobCreateVerticals: getJobCreateVerticalsResponse()
  })
}

export default updateAddNewJobMocks
