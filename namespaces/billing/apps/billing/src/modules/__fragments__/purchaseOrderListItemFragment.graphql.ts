import { gql } from '@apollo/client'
import { webResourceFragment } from '@staff-portal/billing/src/__fragments__/webResourceFragment.graphql'

export const purchaseOrderListItemFragment = gql`
  fragment PurchaseOrderListItemFragment on PurchaseOrder {
    archived
    budgetLeft
    budgetSpent
    client {
      webResource {
        ...WebResourceFragment
      }
    }
    id
    invoicedAmount
    draftedAmount
    poNumber
    threshold
    totalAmount
    webResource {
      ...WebResourceFragment
    }
  }

  ${webResourceFragment}
`
