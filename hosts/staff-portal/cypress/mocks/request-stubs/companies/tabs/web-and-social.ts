import { Client } from '@staff-portal/graphql/staff'

import {
  getOfacStatusDataResponse,
  getClientBillingDetailsResponse,
  getClientContractsResponse
} from '~integration/mocks/responses'
import { companiesSharedStubs } from '~integration/mocks/request-stubs/companies/shared-stubs'

export const companiesWebAndSocialTabStubs = (client?: Partial<Client>) => ({
  ...companiesSharedStubs(client),
  GetOfacStatusData: getOfacStatusDataResponse(client),
  GetClientBillingDetails: getClientBillingDetailsResponse(client),
  GetContracts: getClientContractsResponse(client)
})
