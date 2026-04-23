import { gql } from '@staff-portal/data-layer-service'

export const INFRACTION_STAFF_FRAGMENT = gql`
  fragment InfractionStaffFragment on Staff {
    id
    fullName
  }
`
