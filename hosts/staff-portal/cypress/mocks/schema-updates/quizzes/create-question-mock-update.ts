import { verticalsMock } from '~integration/mocks'
import { enabledOperationMock } from '~integration/mocks/enabled-operation-mock'
import { successMutationMock } from '~integration/mocks/mutations'

const updateCreateQuestionMocks = () => {
  cy.updateStaffMocks({
    QueryOperations: {
      createTalentQuizQuestion: enabledOperationMock
    },
    Query: {
      verticals: verticalsMock
    },
    Mutation: {
      createTalentQuizQuestion: successMutationMock
    }
  })
}

export default updateCreateQuestionMocks
