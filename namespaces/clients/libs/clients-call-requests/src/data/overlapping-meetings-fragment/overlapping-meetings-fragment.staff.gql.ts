import { gql } from '@staff-portal/data-layer-service'

export const OVERLAPPING_MEETINGS_FRAGMENT = gql`
  fragment OverlappingMeetingsFragment on CallbackRequest {
    id
    overlappingMeetings {
      nodes {
        name
        scheduledAt
        __typename
      }
      __typename
    }
    __typename
  }
`
