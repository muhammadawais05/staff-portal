import { encodeEntityId } from '@staff-portal/data-layer-service'
import {
  Client,
  CompanyRepresentative,
  Contact,
  ContactConnection
} from '@staff-portal/graphql/staff'

import { companyApplicantsPageStubs } from '~integration/mocks/request-stubs'

const updateCompanyApplicantsContactActionsStubs = (
  client?: Partial<Client>
) => {
  cy.stubGraphQLRequests({
    ...companyApplicantsPageStubs({
      contact: {
        id: encodeEntityId('123', 'CompanyRepresentative'),
        fullName: 'Company Representative Name',
        lastLogin: '2022-03-12T06:39:13+03:00',
        email: 'test@toptal.io',
        skype: 'SKYPE_ID',
        contacts: {
          nodes: [
            {
              id: encodeEntityId('123', 'Contact'),
              value: '+12345678987',
              note: null,
              primary: true,
              category: 'other',
              __typename: 'Contact'
            } as unknown as Contact
          ],
          __typename: 'ContactConnection'
        } as unknown as ContactConnection,
        __typename: 'CompanyRepresentative'
      } as unknown as CompanyRepresentative,
      ...client
    }),
    CallContact: {
      data: {
        callContact: {
          success: true,
          errors: [],
          __typename: 'CallContactPayload',
          externalCallUrl: '/applicants/companies?page=911'
        }
      }
    }
  })
}

export default updateCompanyApplicantsContactActionsStubs
