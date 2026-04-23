import { gql } from '@apollo/client'
import { webResourceFragment } from '@staff-portal/billing/src/__fragments__/webResourceFragment.graphql'

export const purchaseOrderFragment = gql`
  fragment PurchaseOrderFragment on PurchaseOrder {
    budgetLeft
    budgetSpent
    draftedAmount
    expiryDate
    archived
    id
    invoicedAmount
    poNumber
    threshold
    totalAmount
    webResource {
      ...WebResourceFragment
    }
  }

  ${webResourceFragment}
`
