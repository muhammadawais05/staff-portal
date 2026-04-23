import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetRescheduleInterviewOperation($interviewId: ID!) {
    node(id: $interviewId) {
      ... on Interview {
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
    }
  }
`
