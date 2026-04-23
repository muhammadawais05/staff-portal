import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Engagement } from '@staff-portal/graphql/staff'

import { getEngagementMock } from '~integration/mocks/fragments'

export const getHiredTalentContentResponse = (
  engagement: Partial<Engagement>
) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Job'),
      engagements: {
        nodes: [getEngagementMock(engagement)],
        __typename: 'JobEngagementConnection'
      },
      __typename: 'Job'
    }
  }
})
