import { encodeEntityId } from '@staff-portal/data-layer-service'
import { ClientCumulativeStatus } from '@staff-portal/graphql/staff'

import { enabledOperationMock } from '~integration/mocks'
import { getClientOperations } from '~integration/mocks/fragments'
import { successMutationMock } from '~integration/mocks/mutations'
import { companiesBasicTabStubs } from '~integration/mocks/request-stubs/companies/tabs'

const updateRepauseCompanyStubs = () => {
  const client = {
    cumulativeStatus: ClientCumulativeStatus.PAUSED_ACTIVE,
    operations: getClientOperations({ repauseClient: enabledOperationMock() })
  }

  cy.stubGraphQLRequests({
    ...companiesBasicTabStubs(client),

    GetLazyOperation: {
      data: {
        node: {
          __typename: 'Client',
          id: encodeEntityId('123', 'Client'),
          operations: {
            repauseClient: enabledOperationMock(),
            __typename: 'ClientOperations'
          }
        }
      }
    },
    RepauseClient: {
      data: {
        repauseClient: successMutationMock()
      }
    }
  })
}

export default updateRepauseCompanyStubs
