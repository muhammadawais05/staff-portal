import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetJobPageData($jobId: ID!) {
    node(id: $jobId) {
      ... on Job {
        id
        possiblyRelatedMeetings {
          nodes {
            id
            scheduledAt
            organizer {
              ... on Node {
                id
              }
              ... on Role {
                id
                fullName
              }
              ... on Client {
                id
                fullName
              }
            }
          }
        }
      }
    }
  }
`
