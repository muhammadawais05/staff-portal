import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '~integration/mocks'
import { getClientOperations } from '~integration/mocks/fragments'
import { successMutationMock } from '~integration/mocks/mutations'
import { companiesBasicTabStubs } from '~integration/mocks/request-stubs/companies/tabs'

const updateRestoreApplicationStubs = () => {
  const client = {
    operations: getClientOperations({
      restoreClient: enabledOperationMock()
    })
  }

  cy.stubGraphQLRequests({
    ...companiesBasicTabStubs(client),
    GetLazyOperation: {
      data: {
        node: {
          __typename: 'Client',
          id: encodeEntityId('123', 'Client'),
          operations: {
            restoreClient: enabledOperationMock(),
            __typename: 'ClientOperations'
          }
        }
      }
    },
    RestoreClient: {
      data: {
        restoreClient: successMutationMock()
      }
    }
  })
}

export default updateRestoreApplicationStubs
