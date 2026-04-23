import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetClientLocation($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        country {
          id
          name
        }
        city
      }
    }
  }
`
