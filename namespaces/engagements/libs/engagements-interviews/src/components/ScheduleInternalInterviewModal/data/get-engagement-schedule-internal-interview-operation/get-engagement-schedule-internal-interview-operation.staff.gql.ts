import { gql } from '@staff-portal/data-layer-service'

import { ENGAGEMENT_SCHEDULE_INTERNAL_FRAGMENT } from '../../../../data'

export const GET_ENGAGEMENT_SCHEDULE_INTERNAL_INTERVIEW_OPERATION = gql`
  query GetEngagementScheduleInternalInterviewOperation($engagementId: ID!) {
    node(id: $engagementId) {
      ... on Engagement {
        id
        ...EngagementScheduleInternalFragment
      }
    }
  }

  ${ENGAGEMENT_SCHEDULE_INTERNAL_FRAGMENT}
`
