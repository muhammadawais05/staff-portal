import { gql } from '@apollo/client'
import { operationItemFragment } from '@staff-portal/billing/src/__fragments__/operationItemFragment.graphql'

export const purchaseOrderOperationsFragment = gql`
  fragment PurchaseOrderOperationsFragment on PurchaseOrderOperations {
    archivePurchaseOrder {
      ...OperationItem
    }
    unarchivePurchaseOrder {
      ...OperationItem
    }
    updatePurchaseOrder {
      ...OperationItem
    }
  }

  ${operationItemFragment}
`
