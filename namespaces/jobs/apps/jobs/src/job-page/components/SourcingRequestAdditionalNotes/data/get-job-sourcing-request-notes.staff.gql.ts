import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetJobSourcingRequestNotes($jobId: ID!) {
    node(id: $jobId) {
      ... on Job {
        id
        sourcingRequest {
          id
          additionalNotes
        }
      }
    }
  }
`
