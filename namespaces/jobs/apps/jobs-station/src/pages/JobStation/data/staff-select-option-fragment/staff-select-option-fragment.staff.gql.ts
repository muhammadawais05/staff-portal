import { gql } from '@staff-portal/data-layer-service'

export const STAFF_SELECT_OPTION_FRAGMENT = gql`
  fragment StaffSelectOptionFragment on Role {
    id
    fullName
  }
`
