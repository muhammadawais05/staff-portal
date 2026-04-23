import { Client } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { getClientOperations } from '~integration/mocks/fragments'
import { successMutationMock } from '~integration/mocks/mutations'
import { enabledOperationMock } from '../../enabled-operation-mock'
import { companiesBasicTabStubs } from '~integration/mocks/request-stubs/companies/tabs'

const updateIssueAnInvoiceStubs = (client?: Partial<Client>) => {
  const mockedClient = {
    ...client,
    operations: {
      ...getClientOperations({
        createClientServiceInvoice: enabledOperationMock(),
        createClientDepositInvoice: enabledOperationMock()
      })
    }
  }

  cy.stubGraphQLRequests({
    ...companiesBasicTabStubs(mockedClient),

    GetLazyOperation: {
      data: {
        node: {
          id: encodeEntityId('123', 'Client'),
          operations: {
            createClientDepositInvoice: enabledOperationMock(),
            createClientServiceInvoice: enabledOperationMock(),
            __typename: 'ClientOperations'
          },
          __typename: 'Client'
        }
      }
    },
    CreateClientServiceInvoice: {
      data: {
        createClientServiceInvoice: successMutationMock()
      }
    },
    CreateClientDepositInvoice: {
      data: {
        createClientDepositInvoice: successMutationMock()
      }
    }
  })
}

export default updateIssueAnInvoiceStubs
