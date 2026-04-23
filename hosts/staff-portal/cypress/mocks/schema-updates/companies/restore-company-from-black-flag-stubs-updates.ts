import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '~integration/mocks'
import { getClientOperations } from '~integration/mocks/fragments'
import { successMutationMock } from '~integration/mocks/mutations'
import { companiesBasicTabStubs } from '~integration/mocks/request-stubs/companies/tabs'

const updateRestoreCompanyFromBlackFlagStubs = () => {
  const client = {
    operations: getClientOperations({
      restoreClientFromBlackFlag: enabledOperationMock()
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
            restoreClientFromBlackFlag: enabledOperationMock(),
            __typename: 'ClientOperations'
          }
        }
      }
    },
    RestoreClientFromBlackFlag: {
      data: {
        restoreClientFromBlackFlag: successMutationMock()
      }
    },
    GetRestoreCompanyFromBlackFlagModalData: {
      data: {
        node: {
          id: encodeEntityId('123', 'Client'),
          fullName: 'DuBuque, Cruickshank and Volkman',
          previousStatus: 'active',
          previousBlackFlagComment: 'Black flag comment.',
          __typename: 'Client'
        }
      }
    }
  })
}

export default updateRestoreCompanyFromBlackFlagStubs
