import { Opportunity } from '@staff-portal/graphql/staff'

import { opportunityNodeMock } from '~integration/mocks/fragments'

export const getOpportunityResponse = (opportunity?: Partial<Opportunity>) => ({
  data: {
    node: {
      ...opportunityNodeMock().node(),
      ...opportunity
    }
  }
})
