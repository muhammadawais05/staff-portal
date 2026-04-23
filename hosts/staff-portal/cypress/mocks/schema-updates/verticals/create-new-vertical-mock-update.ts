import { enabledOperationMock } from '~integration/mocks'
import { successMutationMock } from '~integration/mocks/mutations'

const updateCreateNewVerticalMocks = () => {
  cy.stubGraphQLRequests({
    CreateVertical: {
      data: {
        createVertical: successMutationMock()
      }
    },
    GetUserOperations: {
      data: {
        operations: {
          createVertical: enabledOperationMock(),
          __typename: 'QueryOperations'
        }
      }
    }
  })
}

export default updateCreateNewVerticalMocks
