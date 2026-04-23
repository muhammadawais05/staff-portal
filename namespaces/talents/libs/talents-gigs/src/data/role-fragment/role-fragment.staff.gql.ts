import { gql } from '@staff-portal/data-layer-service'
import { TIME_ZONE_FRAGMENT } from '@staff-portal/date-time-utils'

export const ROLE_FRAGMENT = gql`
  fragment RoleFragment on RoleInterface {
    id
    ... on Talent {
      fullName
      timeZone {
        ...TimeZoneFragment
      }
      webResource {
        url
        text
      }
    }
    ... on Staff {
      fullName
      timeZone {
        ...TimeZoneFragment
      }
      webResource {
        url
        text
      }
    }
  }

  ${TIME_ZONE_FRAGMENT}
`
