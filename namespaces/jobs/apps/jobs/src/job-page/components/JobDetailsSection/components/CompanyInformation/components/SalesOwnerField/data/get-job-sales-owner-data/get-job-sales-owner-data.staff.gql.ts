import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetJobSalesOwnerData($jobId: ID!) {
    node(id: $jobId) {
      ... on Job {
        id
        currentSalesOwner {
          owner {
            ...JobDetailsStaffFragment
          }
          relationship
        }
        operations {
          updateJobSalesOwner {
            callable
            messages
          }
        }
      }
    }
  }
`
