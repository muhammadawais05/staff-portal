import { gql } from '@apollo/client'

export default gql`
  query GetClientBillingAttachTimesheetsToInvoices($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        attachTimesheetsToInvoices
      }
    }
  }
`
