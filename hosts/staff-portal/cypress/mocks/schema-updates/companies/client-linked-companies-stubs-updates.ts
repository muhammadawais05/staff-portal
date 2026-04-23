import { Client } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '~integration/mocks/enabled-operation-mock'
import { successMutationMock } from '~integration/mocks/mutations'
import { companiesBasicTabStubs } from '~integration/mocks/request-stubs/companies/tabs'

const updateLinkedCompaniesStubs = (linkedCompanies: Partial<Client>[]) => {
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
          id: encodeEntityId('111', 'Client'),
          operations: {
            importSTA: enabledOperationMock(),
            startNegotiationForClient: enabledOperationMock(),
            negotiationStartForClient: enabledOperationMock(),
            __typename: 'ClientOperations'
          },
          __typename: 'Client'
        }
      }
    },
    ImportSTA: {
      data: {
        importSTA: successMutationMock()
      }
    },
    StartNegotiation: {
      data: {
        startNegotiationForClient: successMutationMock()
      }
    }
  })
}

export default updateLinkedCompaniesStubs
