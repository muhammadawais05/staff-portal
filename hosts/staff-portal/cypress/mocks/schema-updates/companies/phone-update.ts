import { CompanyRepresentative } from '@staff-portal/graphql/staff'

import { successMutationMock } from '~integration/mocks/mutations'
import { enabledOperationMock } from '../../enabled-operation-mock'
import {
  getClientPhoneContacts,
  getCompanyOverviewDataResponse
} from '~integration/mocks/responses'
import { getCompanyRepresentativeOperations } from '~integration/mocks/fragments'
import { companiesBasicTabStubs } from '~integration/mocks/request-stubs/companies/tabs'

export const updatePhoneStubs = () => {
  const {
    data: { node: client }
  } = getCompanyOverviewDataResponse()

  const mockedClient = {
    id: client.id,
    contact: {
      ...(client.contact as CompanyRepresentative),
      operations: {
        ...getCompanyRepresentativeOperations(),
        updateCompanyRepresentativePhoneNumbers: enabledOperationMock()
      }
    },
    __typename: 'Client'
  }

  cy.stubGraphQLRequests({
    ...companiesBasicTabStubs(mockedClient),

    GetClientPhoneContacts: getClientPhoneContacts(),
    SetUpdateCompanyRepresentativePhoneNumbers: {
      data: {
        updateCompanyRepresentativePhoneNumbers: successMutationMock({
          companyRepresentative: {
            client: {
              ...mockedClient,
              contact: {
                ...mockedClient.contact,
                orderedPhoneNumbers: {
                  nodes: [
                    {
                      id: 'VjEtQ29udGFjdC0zMzczMTMx',
                      type: 'PHONE',
                      value: 'phone 1',
                      primary: false,
                      note: 'TEST_NOTE_1',
                      phoneCategory: 'OTHER',
                      __typename: 'Contact'
                    },
                    {
                      id: 'VjEtQ29udGFjdC0zMzczMTTx',
                      type: 'PHONE',
                      value: 'phone 2',
                      note: 'TEST_NOTE_2',
                      primary: true,
                      phoneCategory: 'OTHER',
                      __typename: 'Contact'
                    }
                  ],
                  totalCount: 2,
                  __typename: 'ContactConnection'
                }
              }
            }
          },
          __typename: 'UpdateCompanyRepresentativePhoneNumbersPayload'
        })
      }
    }
  })
}
