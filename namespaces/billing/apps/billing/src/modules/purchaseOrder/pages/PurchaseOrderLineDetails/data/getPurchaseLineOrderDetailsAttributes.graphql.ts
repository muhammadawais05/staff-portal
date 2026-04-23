import { gql } from '@apollo/client'

// This query exists as it contains the 'cheaper' values to fetch from the BE compared to getPurchaseOrderLineDetails (e.g. operations)
export default gql`
  query GetPurchaseOrderLineDetailsAttributes($id: ID!) {
    node(id: $id) {
      ... on PurchaseOrderLine {
        draftedAmount
        expiryDate
        id
        invoicedAmount
        poLineNumber
        threshold
        totalAmount
      }
    }
  }
`
