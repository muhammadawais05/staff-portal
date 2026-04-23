import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetClientContactName($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        contact {
          id
          fullName
        }
      }
    }
  }
`
