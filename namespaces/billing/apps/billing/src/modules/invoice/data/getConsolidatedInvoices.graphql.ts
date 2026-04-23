import { gql } from '@apollo/client'

export default gql`
  query GetConsolidatedInvoices($invoiceId: ID!) {
    node(id: $invoiceId) {
      ... on Invoice {
        id
        unconsolidated
        originalInvoices {
          nodes {
            ...OriginalInvoiceItemFragment
          }
        }
        formerOriginalInvoices {
          nodes {
            ...OriginalInvoiceItemFragment
          }
        }
      }
    }
  }
`
