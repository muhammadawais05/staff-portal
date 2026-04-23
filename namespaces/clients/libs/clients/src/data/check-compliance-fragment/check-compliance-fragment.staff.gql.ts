import { gql } from '@staff-portal/data-layer-service'
import { COUNTRY_FRAGMENT } from '@staff-portal/facilities'
import { TIME_ZONE_FRAGMENT } from '@staff-portal/date-time-utils'

export const CHECK_CLIENT_COMPLIANCE_FRAGMENT = gql`
  fragment CheckComplianceFragment on Client {
    id
    contact {
      id
      fullName
    }
    country {
      ...CountryFragment
    }
    timeZone {
      ...TimeZoneFragment
    }
    fullName
  }

  ${COUNTRY_FRAGMENT}
  ${TIME_ZONE_FRAGMENT}
`
