import { gql } from '@staff-portal/data-layer-service'
import { TIME_ZONE_FRAGMENT } from '@staff-portal/date-time-utils'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'
import { TALENT_ENGAGEMENT_RATES_FRAGMENT } from '@staff-portal/talents'

export default gql`
  query GetTalentInfoData($talentId: ID!) {
    node(id: $talentId) {
      ... on Talent {
        id
        fullName
        hourlyRate
        resumeUrl

        photo {
          small
        }

        talentPartner {
          id
          webResource {
            text
            url
          }
        }

        webResource {
          text
          url
        }

        location: locationV2 {
          country {
            id
            name
          }
        }

        timeZone {
          ...TimeZoneFragment
        }

        emailMessaging {
          id
          operations {
            sendEmailTo {
              ...OperationFragment
            }
          }
        }

        ...TalentEngagementRatesFragment
      }
    }
  }
  ${OPERATION_FRAGMENT}
  ${TIME_ZONE_FRAGMENT}
  ${TALENT_ENGAGEMENT_RATES_FRAGMENT}
`
