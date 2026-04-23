import { Engagement } from '@staff-portal/graphql/staff'

import { getEngagementMock } from '~integration/mocks/fragments'

export const getEngagementResponse = (engagement?: Partial<Engagement>) => {
  const engagementResult = getEngagementMock(engagement)
  const talent = { slackContacts: { nodes: [] }, ...engagementResult.talent }

  return {
    data: {
      node: {
        ...engagementResult,
        talent,
        latestExternalInterview: {
          nodes: [],
          __typename: 'InterviewConnection'
        },
        latestInternalInterview: {
          nodes: [],
          __typename: 'InterviewConnection'
        }
      }
    }
  }
}
