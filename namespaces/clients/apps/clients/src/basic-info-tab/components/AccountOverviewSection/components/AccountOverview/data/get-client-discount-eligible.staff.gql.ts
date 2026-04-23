import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetClientDiscountEligible($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        discountEligible
      }
    }
  }
`
