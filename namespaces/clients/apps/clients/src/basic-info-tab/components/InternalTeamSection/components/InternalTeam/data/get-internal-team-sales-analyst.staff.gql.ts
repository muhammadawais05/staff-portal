import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetClientSalesAnalyst($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        salesAnalyst {
          id
          fullName
        }
      }
    }
  }
`
