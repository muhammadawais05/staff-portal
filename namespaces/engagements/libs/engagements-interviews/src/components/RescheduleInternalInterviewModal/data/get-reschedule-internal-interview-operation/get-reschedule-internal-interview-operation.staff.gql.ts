import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetRescheduleInternalInterviewOperation($interviewId: ID!) {
    node(id: $interviewId) {
      ... on Interview {
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
    }
  }
`
