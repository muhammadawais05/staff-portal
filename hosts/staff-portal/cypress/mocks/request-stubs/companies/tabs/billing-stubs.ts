import { Client } from '@staff-portal/graphql/staff'

import {
  getClientBasicBillingInfoResponse,
  getClientBillingInformationNotesResponse,
  getClientConsolidationDefaultsResponse,
  getClientCommissionResponse
} from '~integration/mocks/responses'
import { companiesSharedStubs } from '~integration/mocks/request-stubs/companies/shared-stubs'

export const companiesBillingTabStubs = (client?: Partial<Client>) => ({
  ...companiesSharedStubs(client),
  GetClientBasicBillingInfo: getClientBasicBillingInfoResponse(client),
  GetClientBillingInformationNotes:
    getClientBillingInformationNotesResponse(client),
  GetConsolidationDefaults: getClientConsolidationDefaultsResponse(client),
  GetCommission: getClientCommissionResponse(client)
})
