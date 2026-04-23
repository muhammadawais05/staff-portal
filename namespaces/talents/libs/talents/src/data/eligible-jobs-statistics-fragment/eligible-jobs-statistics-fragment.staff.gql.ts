import { gql } from '@staff-portal/data-layer-service'

export const ELIGIBLE_JOBS_STATISTICS_FRAGMENT = gql`
  fragment EligibleJobsStatisticsFragment on Talent {
    id
    eligibleJobsStatistics {
      alreadyInterviewing
      beFirstToApply
      candidatesIntroducedToClient
      reviewingApplications
    }
  }
`
