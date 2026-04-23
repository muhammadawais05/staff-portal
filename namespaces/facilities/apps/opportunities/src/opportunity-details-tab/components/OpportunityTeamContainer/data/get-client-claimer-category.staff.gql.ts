import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetClientClaimerCategory($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        claimerCategory
      }
    }
  }
`
