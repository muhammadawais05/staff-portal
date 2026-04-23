import { gql } from '@staff-portal/data-layer-service'

export const STATUS_JOB_ISSUES_FRAGMENT = gql`
  fragment StatusJobIssuesFragment on TalentJobEdgeJobIssues {
    status
    failedMetrics {
      message
      name
      status
    }
  }
`
