import { ProposedEngagementEndStatus } from '@staff-portal/graphql/staff'

import { ProposedEngagementEndMutationFragment } from './propose-engagement-estimate-end-date.staff.gql.types'

export const createProposeEngagementEstimateEndDateMutationMock = (
  proposedEnd?: Partial<ProposedEngagementEndMutationFragment>
) => ({
  success: true,
  errors: [],
  engagement: {
    id: '123',
    proposedEnd: {
      endDate: '2020-12-12',
      id: '123',
      status: ProposedEngagementEndStatus.PENDING,
      ...proposedEnd
    }
  }
})
