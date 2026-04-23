import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '~integration/mocks'
import { getClientOperations } from '~integration/mocks/fragments'
import { successMutationMock } from '~integration/mocks/mutations'
import { companiesBasicTabStubs } from '~integration/mocks/request-stubs/companies/tabs'

const client = {
  operations: getClientOperations({ resumeClient: enabledOperationMock() })
}

const updateResumeCompanyStubs = () =>
  cy.stubGraphQLRequests({
    ...companiesBasicTabStubs(client),
    GetLazyOperation: {
      data: {
        node: {
          __typename: 'Client',
          id: encodeEntityId('123', 'Client'),
          operations: {
            resumeClient: enabledOperationMock(),
            __typename: 'ClientOperations'
          }
        }
      }
    },
    ResumeClient: {
      data: {
        resumeClient: successMutationMock()
      }
    }
  })

export default updateResumeCompanyStubs
