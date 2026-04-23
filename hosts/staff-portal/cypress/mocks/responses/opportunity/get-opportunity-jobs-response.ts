import { Opportunity } from '@staff-portal/graphql/staff'

import { getOpportunityJobsMock } from '~integration/mocks/fragments/get-opportunity-jobs-mock'
import { opportunityNodeMock } from '~integration/mocks/fragments'

export const getOpportunityJobsResponse = (
  opportunity?: Partial<Opportunity>
) => ({
  data: {
    node: {
      ...opportunityNodeMock().node(),
      ...getOpportunityJobsMock(),
      ...opportunity
    }
  }
})
