import { gql } from '@staff-portal/data-layer-service'

export const RELATED_MEETINGS_FRAGMENT = gql`
  fragment RelatedMeetingsFragment on Job {
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
`
