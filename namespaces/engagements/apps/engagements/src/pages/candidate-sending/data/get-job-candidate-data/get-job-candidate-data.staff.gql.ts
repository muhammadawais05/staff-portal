import { gql } from '@staff-portal/data-layer-service'
import { WEB_RESOURCE_FRAGMENT } from '@staff-portal/facilities'
import { TIME_ZONE_FRAGMENT } from '@staff-portal/date-time-utils'

export const JOB_STATUS_FRAGMENT = gql`
  fragment JobStatusFragment on Job {
    status
    hiredCount
    matcherCallScheduled
    cumulativeStatus
    currentInvestigation {
      id
      startedAt
    }
  }
`

export default gql`
  query GetJobCandidateData($jobId: ID!) {
    node(id: $jobId) {
      ... on Job {
        id
        title
        postedAt

        commitment
        talentCount
        engagements {
          nodes {
            id
            commitment
          }
        }

        client {
          id
          enterprise
          fullName
          ...WebResourceFragment
        }

        hasPreferredHours
        hoursOverlapEnum
        timeZonePreference {
          ...TimeZoneFragment
        }

        workType
        jobType
        talentCount
        ...JobStatusFragment

        rehire
        automatedAvailabilityRequests

        webResource {
          text
          url
        }
      }
    }
  }
  ${WEB_RESOURCE_FRAGMENT}
  ${JOB_STATUS_FRAGMENT}
  ${TIME_ZONE_FRAGMENT}
`
