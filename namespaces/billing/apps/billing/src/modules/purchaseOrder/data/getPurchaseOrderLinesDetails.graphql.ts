import { gql } from '@apollo/client'

export default gql`
  query GetPurchaseOrderLinesDetails($nodeId: ID!) {
    node(id: $nodeId) {
      ... on PurchaseOrder {
        id
        purchaseOrderLines {
          nodes {
            archived
            id
            poLineNumber
            totalAmount
            draftedAmount
            invoicedAmount
            webResource {
              ...WebResourceFragment
            }
          }
        }
      }
    }
  }
`
