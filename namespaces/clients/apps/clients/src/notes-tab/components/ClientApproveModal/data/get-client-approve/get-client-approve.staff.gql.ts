import { gql } from '@staff-portal/data-layer-service'
import { TIME_ZONE_FRAGMENT } from '@staff-portal/date-time-utils'
import { COUNTRY_FRAGMENT } from '@staff-portal/facilities'

export default gql`
  query GetClientApprove($clientId: ID!) {
    clientIndustries
    clientBusinessModels
    clientSeamlessMatchingPitchSkipReasons
    countries {
      nodes {
        ...CountryFragment
      }
    }
    staffNode(id: $clientId) {
      ...ClientApproveFragment
    }
  }

  fragment ClientApproveFragment on Client {
    id
    fullName
    website
    businessModels
    industry
    employeeCountEstimation
    country {
      id
    }
    city
    seamlessMatchingPitchAvailableOnApproval
    contact {
      ...ClientContactFragment
    }
  }

  fragment ClientContactFragment on CompanyRepresentative {
    id
    timeZone {
      ...TimeZoneFragment
    }
    phones: contacts(filter: { type: PHONE }) {
      nodes {
        id
        value
      }
      totalCount
    }
    skype
  }
  ${COUNTRY_FRAGMENT}
  ${TIME_ZONE_FRAGMENT}
`
