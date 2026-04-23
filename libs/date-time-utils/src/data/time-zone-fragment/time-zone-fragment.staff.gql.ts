import { gql } from '@staff-portal/data-layer-service'

export const TIME_ZONE_FRAGMENT = gql`
  fragment TimeZoneFragment on TimeZone {
    name
    value
  }
`
