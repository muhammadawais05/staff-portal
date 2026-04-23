import { gql } from '@staff-portal/data-layer-service'

export const JOB_ENGAGEMENT_EDGE_FRAGMENT = gql`
  fragment JobEngagementEdgeFragment on JobEngagementEdge {
    jobIssues {
      status
      failedMetrics {
        message
        name
        status
      }
    }
  }
`
