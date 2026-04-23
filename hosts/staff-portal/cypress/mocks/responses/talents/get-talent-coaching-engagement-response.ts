import { TalentCoachingEngagement } from '@staff-portal/graphql/staff'

import { getTalentCoachingEngagementMock } from '~integration/mocks/fragments'

export const getTalentCoachingEngagementResponse = (
  coachingEngagement?: TalentCoachingEngagement
) => ({
  data: {
    node: coachingEngagement ?? getTalentCoachingEngagementMock()
  }
})
