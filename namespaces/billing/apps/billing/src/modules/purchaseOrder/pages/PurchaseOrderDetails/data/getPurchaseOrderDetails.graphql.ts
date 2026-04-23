import { gql } from '@apollo/client'

export default gql`
  query GetPurchaseOrderDetails($id: ID!) {
    node(id: $id) {
      ...GetPurchaseOrderDetailsNodeFragment
    }
  }

  fragment GetPurchaseOrderDetailsNodeFragment on PurchaseOrder {
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
      ...PurchaseOrderOperationsFragment
    }
    poNumber
    shared
    threshold
    totalAmount
    webResource {
      ...WebResourceFragment
    }
  }
`
