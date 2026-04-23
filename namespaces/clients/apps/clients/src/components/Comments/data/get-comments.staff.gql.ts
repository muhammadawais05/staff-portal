import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetComments($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        commentsAccessible
        cumulativeStatus
      }
    }
  }
`
