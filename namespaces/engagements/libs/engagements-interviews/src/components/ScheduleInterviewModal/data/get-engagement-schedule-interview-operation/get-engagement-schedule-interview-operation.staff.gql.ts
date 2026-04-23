import { gql } from '@staff-portal/data-layer-service'

import { ENGAGEMENT_SCHEDULE_FRAGMENT } from '../../../../data'

export const GET_ENGAGEMENT_SCHEDULE_INTERVIEW_OPERATION = gql`
  query GetEngagementScheduleInterviewOperation($engagementId: ID!) {
    node(id: $engagementId) {
      ... on Engagement {
        id
        ...EngagementScheduleFragment
      }
    }
  }

  ${ENGAGEMENT_SCHEDULE_FRAGMENT}
`
