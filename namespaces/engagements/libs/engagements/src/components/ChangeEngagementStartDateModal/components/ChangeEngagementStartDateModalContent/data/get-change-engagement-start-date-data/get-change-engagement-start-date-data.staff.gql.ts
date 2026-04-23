import { gql } from '@staff-portal/data-layer-service'
import { TIME_ZONE_FRAGMENT } from '@staff-portal/date-time-utils'

export const GETCHANGE_ENGAGEMENT_START_DATE_DATA = gql`
  query GetChangeEngagementStartDateData($engagementId: ID!) {
    node(id: $engagementId) {
      ... on Engagement {
        id
        timeZone {
          ...TimeZoneFragment
        }
      }
    }
  }

  ${TIME_ZONE_FRAGMENT}
`
