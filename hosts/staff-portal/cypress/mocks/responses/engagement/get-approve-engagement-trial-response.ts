import { successMutationMock } from '../../mutations'

export const getApproveEngagementTrialResponse = () => ({
  data: {
    approveEngagementTrial: successMutationMock()
  }
})
