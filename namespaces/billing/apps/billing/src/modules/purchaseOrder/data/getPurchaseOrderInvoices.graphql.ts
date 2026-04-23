import { gql } from '@apollo/client'

export default gql`
  query GetPurchaseOrderInvoices($nodeId: ID!, $pagination: OffsetPagination) {
    node(id: $nodeId) {
      ... on PurchaseOrderLine {
        id
        invoices(pagination: $pagination) {
          totalCount
          nodes {
            ...InvoiceListItemFragment
          }
        }
      }
      ... on PurchaseOrder {
        id
        invoices(pagination: $pagination) {
          totalCount
          nodes {
            ...InvoiceListItemFragment
          }
        }
      }
    }
  }
`
