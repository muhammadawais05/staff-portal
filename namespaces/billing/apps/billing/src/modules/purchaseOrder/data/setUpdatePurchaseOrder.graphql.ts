import { gql } from '@apollo/client'

export default gql`
  mutation SetUpdatePurchaseOrder($input: UpdatePurchaseOrderInput!) {
    updatePurchaseOrder(input: $input) {
      purchaseOrder {
        id
        purchaseOrderLines {
          nodes {
            archived
            id
            poLineNumber
            totalAmount
            draftedAmount
            webResource {
              ...WebResourceFragment
            }
          }
        }
      }
      notice
      success
      errors {
        message
        code
        key
      }
    }
  }
`
