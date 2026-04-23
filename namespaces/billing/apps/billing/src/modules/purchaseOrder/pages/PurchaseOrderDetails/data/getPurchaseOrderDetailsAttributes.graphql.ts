import { gql } from '@apollo/client'
import { webResourceFragment } from '@staff-portal/billing/src/__fragments__/webResourceFragment.graphql'

import { purchaseOrderOperationsFragment } from '../../../../__fragments__/purchaseOrderOperationsFragment.graphql'

export default gql`
  query GetPurchaseOrderDetailsAttributes($id: ID!) {
    node(id: $id) {
      ...GetPurchaseOrderDetailsAttributesNodeFragment
    }
  }

  fragment GetPurchaseOrderDetailsAttributesNodeFragment on PurchaseOrder {
    draftedAmount
    expiryDate
    id
    invoicedAmount
    poNumber
    threshold
    totalAmount
  }

  ${purchaseOrderOperationsFragment}
  ${webResourceFragment}
`
