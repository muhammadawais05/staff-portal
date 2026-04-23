import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Client, VisualComplianceStatus } from '@staff-portal/graphql/staff'

import { successMutationMock } from '~integration/mocks/mutations'
import {
  getCountriesResponse,
  getEmailContactsResponse,
  getPendoVisitorResponse,
  getTeamsWithEmailTrackingResponse
} from '~integration/mocks/responses'
import { getClientOperations, timeZoneMock } from '~integration/mocks/fragments'
import { clientRepresentativesMock } from '~integration/mocks/fragments/client-representatives-mock'
import { companiesBasicTabStubs } from '~integration/mocks/request-stubs/companies/tabs'
import { enabledOperationMock } from '~integration/mocks/enabled-operation-mock'
import { hiddenOperationMock } from '~integration/mocks/hidden-operation-mock'
import { countriesMock } from '~integration/mocks/countries-mock'

const clientId = encodeEntityId('123', 'Client')
const clientFullName = 'DuBuque, Cruickshank and Volkman'

const updateCheckComplianceStubs = (data?: Partial<Client>) => {
  const client = {
    ...data,
    operations: {
      ...getClientOperations({
        checkClientCompliance: enabledOperationMock()
      })
    }
  } as Partial<Client>

  cy.stubGraphQLRequests({
    ...companiesBasicTabStubs(client),
    GetCountries: getCountriesResponse(),
    GetTeamsWithEmailTracking: getTeamsWithEmailTrackingResponse(),
    GetEmailContacts: getEmailContactsResponse(),
    GetPendoVisitor: getPendoVisitorResponse(),
    GetLazyOperation: {
      data: {
        node: {
          id: clientId,
          operations: {
            checkClientCompliance: enabledOperationMock(),
            __typename: 'ClientOperations'
          },
          __typename: 'Client'
        }
      }
    },
    CheckClientCompliance: {
      data: {
        checkClientCompliance: successMutationMock({
          client: {
            id: clientId,
            fullName: clientFullName,
            contact: clientRepresentativesMock().representatives.nodes[0],
            country: countriesMock()[0],
            timeZone: timeZoneMock(),
            operations: {
              checkClientCompliance: hiddenOperationMock(),
              __typename: 'ClientOperations'
            },
            __typename: 'Client'
          },
          __typename: 'CheckClientCompliancePayload'
        })
      }
    },
    GetCheckClientComplianceData: {
      data: {
        node: {
          id: clientId,
          fullName: clientFullName,
          contact: clientRepresentativesMock().representatives.nodes[0],
          country: countriesMock()[0],
          timeZone: timeZoneMock(),
          __typename: 'Client'
        }
      }
    },
    GetCheckComplianceStatus: {
      data: {
        node: {
          id: clientId,
          ofacProhibited: false,
          visualComplianceStatus: VisualComplianceStatus.FULLY_CHECKED,
          operations: {
            checkClientCompliance: hiddenOperationMock(),
            __typename: 'ClientOperations'
          },
          __typename: 'Client'
        }
      }
    },
    GetUnfilledCallsCount: {
      data: {
        viewer: {
          calls: {
            totalCount: 50,
            __typename: 'CallsConnection'
          },
          __typename: 'Viewer'
        }
      }
    }
  })
}

export default updateCheckComplianceStubs
