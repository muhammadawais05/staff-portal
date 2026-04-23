import { encodeEntityId } from '@staff-portal/data-layer-service'

import { getClientOperations } from '~integration/mocks/fragments'
import { successMutationMock } from '~integration/mocks/mutations'
import { enabledOperationMock } from '../../enabled-operation-mock'
import { companiesBasicTabStubs } from '~integration/mocks/request-stubs/companies/tabs'

const updateInviteContactStubs = () => {
  const client = {
    operations: {
      ...getClientOperations({
        inviteCompanyRepresentative: enabledOperationMock()
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
            inviteCompanyRepresentative: enabledOperationMock(),
            __typename: 'ClientOperations'
          },
          __typename: 'Client'
        }
      }
    },
    InviteContact: {
      data: {
        inviteCompanyRepresentative: successMutationMock({
          client: {
            id: encodeEntityId('123', 'Client'),
            __typename: 'Client'
          },
          companyRepresentative: {
            id: encodeEntityId('101', 'CompanyRepresentative'),
            fullName: 'test',
            email: 'test@email.com',
            __typename: 'CompanyRepresentative'
          }
        })
      }
    }
  })
}

export default updateInviteContactStubs
