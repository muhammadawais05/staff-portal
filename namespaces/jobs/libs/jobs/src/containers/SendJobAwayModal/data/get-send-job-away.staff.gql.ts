import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetSendJobAway($jobId: ID!) {
    node(id: $jobId) {
      ... on Job {
        id

        possiblyRelatedMeetings {
          totalCount

          nodes {
            id
            scheduledAt
            organizer {
              ... on Role {
                fullName
              }
              ... on Staff {
                fullName
              }
              ... on Client {
                fullName
              }
            }
          }
        }
      }
    }
  }
`
