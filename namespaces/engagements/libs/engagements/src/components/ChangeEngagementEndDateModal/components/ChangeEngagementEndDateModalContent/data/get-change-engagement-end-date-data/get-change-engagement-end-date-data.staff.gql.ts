import { gql } from '@staff-portal/data-layer-service'

export const GET_CHANGE_ENGAGEMENT_END_DATE_DATA = gql`
  query GetChangeEngagementEndDateData($engagementId: ID!) {
    node(id: $engagementId) {
      ... on Engagement {
        id
        endDate
      }
    }
  }
`
