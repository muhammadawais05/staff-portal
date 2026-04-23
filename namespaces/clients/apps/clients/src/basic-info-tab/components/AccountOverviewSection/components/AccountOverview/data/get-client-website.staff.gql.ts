import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetClientWebsite($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        website
      }
    }
  }
`
