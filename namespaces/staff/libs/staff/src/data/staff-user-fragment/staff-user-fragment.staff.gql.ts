import { gql } from '@staff-portal/data-layer-service'

export const STAFF_USER_FRAGMENT = gql`
  fragment StaffUserFragment on Staff {
    id
    fullName
    webResource {
      url
      text
    }
  }
`
