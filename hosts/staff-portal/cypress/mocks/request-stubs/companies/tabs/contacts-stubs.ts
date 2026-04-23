import { Client } from '@staff-portal/graphql/staff'

import { getClientContactsResponse } from '~integration/mocks/responses'
import { companiesSharedStubs } from '~integration/mocks/request-stubs/companies/shared-stubs'

export const companiesContactsTabStubs = (client?: Partial<Client>) => ({
  ...companiesSharedStubs(client),
  GetClientContacts: getClientContactsResponse(client)
})
