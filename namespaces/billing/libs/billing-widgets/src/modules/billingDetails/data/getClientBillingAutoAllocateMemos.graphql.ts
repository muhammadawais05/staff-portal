import { gql } from '@apollo/client'

export default gql`
  query GetClientBillingAutoAllocateMemos($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        autoAllocateMemos
      }
    }
  }
`
