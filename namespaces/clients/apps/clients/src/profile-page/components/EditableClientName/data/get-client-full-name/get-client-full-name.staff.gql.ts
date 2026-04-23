import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetClientFullName($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        fullName
      }
    }
  }
`
