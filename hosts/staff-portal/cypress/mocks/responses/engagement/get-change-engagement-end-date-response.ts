import { encodeEntityId } from '@staff-portal/data-layer-service'

import { successMutationMock } from '../../mutations'

export const getChangeEngagementEndDateResponse = () => ({
  data: {
    changeEngagementEndDate: successMutationMock({
      engagement: {
        id: encodeEntityId('123', 'Engagement'),
        endDate: null
      }
    })
  }
})
