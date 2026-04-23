import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetEngagementProposeEndDate($engagementId: ID!) {
    node(id: $engagementId) {
      ... on Engagement {
        id
        proposedEnd {
          id
          endDate
        }
      }
    }
  }
`
