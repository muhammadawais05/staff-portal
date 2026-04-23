import { gql } from '@apollo/client'

export default gql`
  query GetPurchaseOrderLineArchiveState($purchaseOrderLineId: ID!) {
    node(id: $purchaseOrderLineId) {
      ... on PurchaseOrderLine {
        id
        archived
        operations {
          archivePurchaseOrderLine {
            ...OperationItem
          }
          unarchivePurchaseOrderLine {
            ...OperationItem
          }
        }
      }
    }
  }
`
