import { Engagement } from '@staff-portal/graphql/staff'

import { getEngagementMock } from '~integration/mocks/fragments'

export interface EngagementWithExperiment extends Engagement {
  experiments: { poLines: { enabled: boolean } }
}

export const getEngagementTalentResponse = (
  engagement?: Partial<EngagementWithExperiment>
) => ({
  data: {
    experiments: {
      poLines: { enabled: engagement?.experiments?.poLines?.enabled }
    },
    node: {
      ...getEngagementMock(engagement),
      latestInternalInterview: {
        nodes: [],
        __typename: 'InterviewConnection'
      }
    }
  }
})
