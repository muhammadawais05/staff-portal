import { gql } from '@apollo/client'

export default gql`
  query GetClientBillingNotifyAboutNewInvoices($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        notifyAboutNewInvoices
      }
    }
  }
`
