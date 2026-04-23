import { gql } from '@staff-portal/data-layer-service'
import { TIME_ZONE_FRAGMENT } from '@staff-portal/date-time-utils'
import { WEB_RESOURCE_FRAGMENT } from '@staff-portal/facilities'

export const GET_ENGAGEMENT_JOB_DETAILS = gql`
  query GetEngagementJobDetails($engagementId: ID!) {
    node(id: $engagementId) {
      ... on Engagement {
        id
        job {
          ...EngagementJobDetailsFragment
        }
      }
    }
  }

  fragment EngagementJobDetailsFragment on Job {
    id
    title
    ...WebResourceFragment
    postedAt
    commitment
    workType
    status
    cumulativeStatus
    matcherCallScheduled
    talentCount
    hiredCount
    currentInvestigation {
      id
      startedAt
    }
    timeZonePreference {
      ...TimeZoneFragment
    }
    hasPreferredHours
    preferHoursOverlapping
    hoursOverlapEnum
    client {
      id
      enterprise
      fullName
      ...WebResourceFragment
    }
    engagements {
      nodes {
        id
        commitment
      }
    }
  }

  ${WEB_RESOURCE_FRAGMENT}
  ${TIME_ZONE_FRAGMENT}
`
