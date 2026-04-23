import { encodeEntityId } from '@staff-portal/data-layer-service'

import { getClientOperations } from '~integration/mocks/fragments'
import { successMutationMock } from '~integration/mocks/mutations'
import { enabledOperationMock } from '../../enabled-operation-mock'
import { companiesBasicTabStubs } from '~integration/mocks/request-stubs/companies/tabs'

const updateDeleteDuplicateStubs = () => {
  const client = {
    operations: {
      ...getClientOperations({
        deleteDuplicateClient: enabledOperationMock()
      })
    }
  }

  cy.stubGraphQLRequests({
    ...companiesBasicTabStubs(client),
    GetLazyOperation: {
      data: {
        node: {
          id: encodeEntityId('123', 'Client'),
          operations: {
            deleteDuplicateClient: enabledOperationMock(),
            __typename: 'ClientOperations'
          },
          __typename: 'Client'
        }
      }
    },
    DeleteDuplicate: {
      data: {
        deleteDuplicateClient: successMutationMock()
      }
    }
  })
}

export default updateDeleteDuplicateStubs
