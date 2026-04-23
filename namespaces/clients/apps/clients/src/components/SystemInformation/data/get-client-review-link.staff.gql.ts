import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetClientReviewLink($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        reviewLink
      }
    }
  }
`
