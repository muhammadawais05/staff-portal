import { Opportunity } from '@staff-portal/graphql/staff'

import { getOpportunityTeamMock } from '~integration/mocks/fragments/get-opportunity-team-mock'
import { opportunityNodeMock } from '~integration/mocks/fragments'

export const getOpportunityTeamResponse = (
  opportunity?: Partial<Opportunity>
) => ({
  data: {
    node: {
      ...opportunityNodeMock().node(),
      ...getOpportunityTeamMock(),
      ...opportunity
    }
  }
})
