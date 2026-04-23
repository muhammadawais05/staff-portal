import { gql } from '@staff-portal/data-layer-service'

export const ENGAGEMENT_RESCHEDULE_INTERNAL_FRAGMENT = gql`
  fragment EngagementRescheduleInternalFragment on Engagement {
    id
    latestInternalInterview: interviews(
      filter: { scope: INTERNAL }
      order: { field: CREATED_AT, direction: DESC }
      pagination: { limit: 1, offset: 0 }
    ) {
      nodes {
        ...EngagementRescheduleInternalInterviewFragment
      }
    }
    newInternalInterview {
      ...EngagementRescheduleInternalInterviewFragment
    }
  }

  fragment EngagementRescheduleInternalInterviewFragment on Interview {
    id
    operations {
      clearAndRescheduleInternalSingleCommitInterview {
        ...OperationFragment
      }
      clearAndChangeInternalInterviewProposedTimeSlots {
        ...OperationFragment
      }
    }
  }
`
