import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetClientPartnerCategory($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        clientPartnerCategory
      }
    }
  }
`
