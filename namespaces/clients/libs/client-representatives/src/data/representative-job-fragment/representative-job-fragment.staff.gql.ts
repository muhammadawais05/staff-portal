import { gql } from '@staff-portal/data-layer-service'

export const REPRESENTATIVE_JOB_FRAGMENT = gql`
  fragment RepresentativeJob on Job {
    id
    webResource {
      text
      url
      __typename
    }
    __typename
  }
`
