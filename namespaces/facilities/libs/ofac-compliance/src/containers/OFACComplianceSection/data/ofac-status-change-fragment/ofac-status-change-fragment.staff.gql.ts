import { gql } from '@staff-portal/data-layer-service'

export const OFAC_STATUS_CHANGE_FRAGMENT = gql`
  fragment OfacStatusChangeFragment on OfacStatusChange {
    comment
    createdAt
    performer {
      id
      fullName
      webResource {
        url
      }
    }
    status
  }
`
