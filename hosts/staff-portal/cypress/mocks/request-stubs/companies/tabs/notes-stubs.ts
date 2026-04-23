import { Client } from '@staff-portal/graphql/staff'

import {
  getDraftJobResponse,
  getCompanyNotesResponse
} from '~integration/mocks/responses'
import { companiesSharedStubs } from '~integration/mocks/request-stubs/companies/shared-stubs'

export const companiesNotesTabStubs = (client?: Partial<Client>) => ({
  ...companiesSharedStubs(client),
  GetDraftJob: getDraftJobResponse(client),
  GetCompanyNotes: getCompanyNotesResponse(client)
})
