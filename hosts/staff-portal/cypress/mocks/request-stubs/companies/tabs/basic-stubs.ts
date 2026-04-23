import { Client } from '@staff-portal/graphql/staff'

import {
  getClientQuizResponse,
  getExperimentsResponse,
  getClientCommentsResponse,
  getSystemInformationResponse,
  getClientInvestigationsResponse,
  getClientReviewAttemptsResponse,
  getTransferRequestResponse,
  getCompanyStatusMessagesResponse
} from '~integration/mocks/responses'
import { companiesSharedStubs } from '~integration/mocks/request-stubs/companies/shared-stubs'

export const companiesBasicTabStubs = (client?: Partial<Client>) => ({
  ...companiesSharedStubs(client),
  GetQuiz: getClientQuizResponse(client),
  GetComments: getClientCommentsResponse(client),
  GetSystemInformation: getSystemInformationResponse(client),
  GetInvestigations: getClientInvestigationsResponse(client),
  GetReviewAttempts: getClientReviewAttemptsResponse(client),
  GetTransferRequest: getTransferRequestResponse(client),
  GetExperiments: getExperimentsResponse(),
  GetNodeStatusMessages: getCompanyStatusMessagesResponse()
})
