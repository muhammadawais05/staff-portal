import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetBillingNotes($roleOrClientId: ID!) {
    node(id: $roleOrClientId) {
      ... on Talent {
        id
        billingNotes
      }
      ... on Client {
        id
        billingNotes
      }
    }
  }
`
