import { gql } from '@staff-portal/data-layer-service'

export const MEETING_PENDING_JOBS_FRAGMENT = gql`
  fragment MeetingPendingJobsFragment on Meeting {
    pendingJobs {
      nodes {
        id
        webResource {
          url
          text
        }
        talentCount
        hiredCount
        status
        cumulativeStatus
        matcherCallScheduled
        currentInvestigation {
          id
          startedAt
        }
      }
    }
  }
`
