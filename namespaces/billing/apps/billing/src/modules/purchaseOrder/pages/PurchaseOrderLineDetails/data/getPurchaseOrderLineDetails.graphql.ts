import { gql } from '@apollo/client'

export default gql`
  query GetPurchaseOrderLineDetails($id: ID!) {
    node(id: $id) {
      ...GetPurchaseOrderLineDetailsNodeFragment
    }
  }

  fragment GetPurchaseOrderLineDetailsNodeFragment on PurchaseOrderLine {
    archived
    client {
      id
      webResource {
        ...WebResourceFragment
      }
    }
    draftedAmount
    expiryDate
    id
    invoicedAmount
    operations {
      ...PurchaseOrderLineOperationsFragment
    }
    poLineNumber
    purchaseOrder {
      id
      poNumber
      webResource {
        ...WebResourceFragment
      }
    }
    shared
    threshold
    totalAmount
    webResource {
      ...WebResourceFragment
    }
  }

  fragment PurchaseOrderLineOperationsFragment on PurchaseOrderLineOperations {
    archivePurchaseOrderLine {
      ...OperationItem
    }
    unarchivePurchaseOrderLine {
      ...OperationItem
    }
    updatePurchaseOrderLine {
      ...OperationItem
    }
  }
`
