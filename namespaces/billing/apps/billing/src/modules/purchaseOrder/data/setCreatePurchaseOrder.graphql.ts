import { gql } from '@apollo/client'

export default gql`
  mutation SetCreatePurchaseOrder($input: CreatePurchaseOrderInput!) {
    createPurchaseOrder(input: $input) {
      purchaseOrder {
        id
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
