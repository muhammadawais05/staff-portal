import { hiddenOperationMock } from '~integration/mocks'

export const getJobApplicantsOperationResponse = () => ({
  data: {
    operations: {
      rejectJobApplicants: hiddenOperationMock(),
      emailJobApplicants: hiddenOperationMock(),
      __typename: 'QueryOperations'
    }
  }
})
