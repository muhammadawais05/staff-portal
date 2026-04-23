import { verticalsMock } from '~integration/mocks'
import { successMutationMock } from '~integration/mocks/mutations'

const updateEditQuestionMocks = () => {
  cy.updateStaffMocks({
    Query: {
      verticals: verticalsMock
    },
    Mutation: {
      updateTalentQuizQuestion: successMutationMock
    }
  })
}

export default updateEditQuestionMocks
