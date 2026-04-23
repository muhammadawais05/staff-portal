import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetJobClientRepresentatives($jobId: ID!) {
    node(id: $jobId) {
      ... on Job {
        id
        client {
          id
          representatives(filter: { statuses: ACTIVE }) {
            nodes {
              id
              fullName
              phoneNumber
            }
          }
        }
      }
    }
  }
`
