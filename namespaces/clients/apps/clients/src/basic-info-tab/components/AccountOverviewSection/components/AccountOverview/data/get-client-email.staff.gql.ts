import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetClientEmail($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        email
      }
    }
  }
`
