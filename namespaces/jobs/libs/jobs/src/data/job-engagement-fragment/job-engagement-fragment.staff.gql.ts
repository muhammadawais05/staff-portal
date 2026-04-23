import { gql } from '@staff-portal/data-layer-service'

export const JOB_ENGAGEMENT_FRAGMENT = gql`
  fragment JobEngagementFragment on Engagement {
    id

    talent {
      id
      fullName
      webResource {
        url
      }
    }
  }
`
