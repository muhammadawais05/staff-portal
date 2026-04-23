import { successMutationMock } from '~integration/mocks/mutations'

export const getChangeEngagementStartDateResponse = () => ({
  data: {
    changeEngagementStartDate: successMutationMock()
  }
})
