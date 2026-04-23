import { gql } from '@staff-portal/data-layer-service'

export const AVAILABILITY_REQUESTS_FRAGMENT = gql`
  fragment AvailabilityRequestsFragment on AvailabilityRequest {
    id
    status
    createdAt
    candidateStatus
    sendCandidateUrl
    job {
      id
      webResource {
        text
        url
      }
      client {
        id
        webResource {
          text
          url
        }
      }
    }
  }
`
