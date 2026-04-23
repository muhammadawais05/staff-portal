import { gql } from '@apollo/client'

export default gql`
  query GetClientBillingNetTerms($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        netTerms
      }
    }
  }
`
