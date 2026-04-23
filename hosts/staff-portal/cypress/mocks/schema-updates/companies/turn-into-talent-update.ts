import { Client } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { getClientOperations } from '~integration/mocks/fragments'
import { successMutationMock } from '~integration/mocks/mutations'
import { enabledOperationMock } from '../../enabled-operation-mock'
import { companiesBasicTabStubs } from '~integration/mocks/request-stubs/companies/tabs'

export const updateTurnIntoTalentStubs = (client?: Partial<Client>) => {
  const mockedClient = {
    ...client,
    operations: {
      ...getClientOperations({
        convertClientToTalent: enabledOperationMock()
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
            convertClientToTalent: enabledOperationMock(),
            __typename: 'ClientOperations'
          },
          __typename: 'Client'
        }
      }
    },
    ConvertClientToTalent: {
      data: {
        convertClientToTalent: successMutationMock({
          talent: {
            id: encodeEntityId('123', 'Talent'),
            fullName: 'John Doe',
            type: 'Developer'
          }
        })
      }
    }
  })
}
