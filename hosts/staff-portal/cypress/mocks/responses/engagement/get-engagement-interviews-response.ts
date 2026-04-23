import { Engagement } from '@staff-portal/graphql/staff'

import { getEngagementMock } from '~integration/mocks/fragments'

export const getEngagementInterviewsResponse = (
  engagement?: Partial<Engagement>
) => ({
  data: {
    node: {
      ...getEngagementMock(engagement)
    }
  }
})
