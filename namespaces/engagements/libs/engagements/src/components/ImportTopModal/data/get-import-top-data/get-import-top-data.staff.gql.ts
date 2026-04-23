import { gql } from '@staff-portal/data-layer-service'

export const GET_IMPORT_TOP_DATA = gql`
  query GetImportTopData($engagementId: ID!) {
    node(id: $engagementId) {
      ... on Engagement {
        id
        nextTopNumber
      }
    }
  }
`
