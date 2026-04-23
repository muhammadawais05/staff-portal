import { gql } from '@staff-portal/data-layer-service'

export const ENGAGEMENT_SCHEDULE_FRAGMENT = gql`
  fragment EngagementScheduleFragment on Engagement {
    id
    latestExternalInterview: interviews(
      filter: { scope: EXTERNAL }
      order: { field: CREATED_AT, direction: DESC }
      pagination: { limit: 1, offset: 0 }
    ) {
      nodes {
        ...EngagementScheduleInterviewFragment
      }
    }
    newExternalInterview {
      ...EngagementScheduleInterviewFragment
    }
  }

  fragment EngagementScheduleInterviewFragment on Interview {
    id
    operations {
      proposeInterviewTimeSlots {
        ...OperationFragment
      }
      scheduleSingleCommitInterview {
        ...OperationFragment
      }
    }
  }
`
