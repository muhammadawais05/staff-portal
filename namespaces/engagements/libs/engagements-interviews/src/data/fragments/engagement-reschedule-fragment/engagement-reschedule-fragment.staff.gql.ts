import { gql } from '@staff-portal/data-layer-service'

export const ENGAGEMENT_RESCHEDULE_FRAGMENT = gql`
  fragment EngagementRescheduleFragment on Engagement {
    id
    latestExternalInterview: interviews(
      filter: { scope: EXTERNAL }
      order: { field: CREATED_AT, direction: DESC }
      pagination: { limit: 1, offset: 0 }
    ) {
      nodes {
        ...EngagementRescheduleInterviewFragment
      }
    }
    newExternalInterview {
      ...EngagementRescheduleInterviewFragment
    }
  }

  fragment EngagementRescheduleInterviewFragment on Interview {
    id
    operations {
      clearAndRescheduleSingleCommitInterview {
        ...OperationFragment
      }
      clearAndChangeInterviewProposedTimeSlots {
        ...OperationFragment
      }
    }
  }
`
