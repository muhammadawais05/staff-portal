import { gql } from '@apollo/client'

export default gql`
  query GetPurchaseOrderLinesToUpdate($nodeId: ID!) {
    node(id: $nodeId) {
      ... on PurchaseOrder {
        id
        poNumber
        client {
          id
          fullName
        }
        purchaseOrderLines {
          nodes {
            archived
            expiryDate
            id
            poLineNumber
            threshold
            totalAmount
          }
        }
      }
    }
  }
`
