import { gql } from '@staff-portal/data-layer-service'

export const ENGAGEMENT_SCHEDULE_INTERNAL_FRAGMENT = gql`
  fragment EngagementScheduleInternalFragment on Engagement {
    id
    latestInternalInterview: interviews(
      filter: { scope: INTERNAL }
      order: { field: CREATED_AT, direction: DESC }
      pagination: { limit: 1, offset: 0 }
    ) {
      nodes {
        ...EngagementScheduleInternalInterviewFragment
      }
    }
    newInternalInterview {
      ...EngagementScheduleInternalInterviewFragment
    }
  }

  fragment EngagementScheduleInternalInterviewFragment on Interview {
    id
    operations {
      scheduleInternalSingleCommitInterview {
        ...OperationFragment
      }
      proposeInternalInterviewTimeSlots {
        ...OperationFragment
      }
    }
  }
`
