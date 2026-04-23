import { Client } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '~integration/mocks/enabled-operation-mock'
import { successMutationMock } from '~integration/mocks/mutations'
import { companiesBasicTabStubs } from '~integration/mocks/request-stubs/companies/tabs'

const updateLinkedCompaniesNegotiationStubs = (
  linkedCompanies: Partial<Client>[]
) => {
  cy.stubGraphQLRequests({
    ...companiesBasicTabStubs(),

    GetLinkedClient: {
      data: {
        staffNode: {
          id: encodeEntityId('123', 'Client'),
          fullName: 'DuBuque, Cruickshank and Volkman',
          children: {
            nodes: linkedCompanies as Client[],
            __typename: 'ClientChildrenConnection'
          },
          __typename: 'Client'
        }
      }
    },
    GetLazyOperation: {
      data: {
        node: {
          id: encodeEntityId('123', 'Negotiation'),
          operations: {
            updateNegotiationStatus: enabledOperationMock(),
            suspendNegotiation: enabledOperationMock(),
            __typename: 'NegotiationOperations'
          },
          __typename: 'Negotiation'
        }
      }
    },
    UpdateNegotiationStatus: {
      data: {
        updateNegotiationStatus: successMutationMock()
      }
    },
    SuspendNegotiation: {
      data: {
        suspendNegotiation: successMutationMock()
      }
    }
  })
}

export default updateLinkedCompaniesNegotiationStubs
