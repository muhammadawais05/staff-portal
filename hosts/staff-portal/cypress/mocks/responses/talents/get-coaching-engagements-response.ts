import { encodeEntityId } from '@staff-portal/data-layer-service'
import { TalentCoachingEngagement } from '@staff-portal/graphql/staff'

export const getCoachingEngagementsResponse = (
  coachingEngagements: TalentCoachingEngagement[] = []
) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Talent'),
      coachingEngagements: {
        nodes: coachingEngagements,
        totalCount: 1,
        __typename: 'TalentCoachingEngagementConnection'
      },
      __typename: 'Talent'
    }
  }
})
