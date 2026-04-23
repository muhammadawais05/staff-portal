import { gql } from '@apollo/client'

export const purchaseOrderLineFragment = gql`
  fragment PurchaseOrderLineFragment on PurchaseOrderLine {
    budgetLeft
    budgetSpent
    draftedAmount
    expiryDate
    archived
    id
    invoicedAmount
    poLineNumber
    threshold
    totalAmount
    webResource {
      ...WebResourceFragment
    }
  }
`
