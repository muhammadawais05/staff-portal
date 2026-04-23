import { gql } from '@apollo/client'

export default gql`
  query GetJobHeader($jobId: ID!) {
    node(id: $jobId) {
      ... on Job {
        id
        title
        webResource {
          url
        }
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
