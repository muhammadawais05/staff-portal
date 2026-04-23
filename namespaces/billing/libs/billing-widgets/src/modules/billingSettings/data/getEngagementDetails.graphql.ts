import { gql } from '@apollo/client'

export default gql`
  query GetEngagementDetails($jobId: ID!) {
    node(id: $jobId) {
      ... on Job {
        id
        engagements(filter: { state: CURRENT }) {
          nodes {
            id
            talent {
              fullName
            }
          }
        }
      }
    }
  }
`
