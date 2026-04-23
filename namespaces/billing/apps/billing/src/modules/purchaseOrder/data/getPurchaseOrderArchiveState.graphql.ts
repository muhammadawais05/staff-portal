import { gql } from '@apollo/client'
import { operationItemFragment } from '@staff-portal/billing/src/__fragments__/operationItemFragment.graphql'

export default gql`
  query GetPurchaseOrderArchiveState($purchaseOrderId: ID!) {
    node(id: $purchaseOrderId) {
      ... on PurchaseOrder {
        id
        archived
        operations {
          archivePurchaseOrder {
            ...OperationItem
          }
          unarchivePurchaseOrder {
            ...OperationItem
          }
        }
      }
    }
  }

  ${operationItemFragment}
`
