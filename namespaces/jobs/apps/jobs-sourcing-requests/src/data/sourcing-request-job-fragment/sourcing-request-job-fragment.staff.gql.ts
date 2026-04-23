import { gql } from '@staff-portal/data-layer-service'

export const SOURCING_REQUEST_JOB_FRAGMENT = gql`
  fragment SourcingRequestJobFragment on Job {
    id
    title
    webResource {
      text
      url
    }
    client {
      id
      enterprise
    }
  }
`
