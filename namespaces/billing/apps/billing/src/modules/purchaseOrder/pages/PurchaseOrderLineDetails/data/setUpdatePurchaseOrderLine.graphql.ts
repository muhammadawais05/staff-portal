import { gql } from '@apollo/client'

export default gql`
  mutation SetUpdatePurchaseOrderLine($input: UpdatePurchaseOrderLineInput!) {
    updatePurchaseOrderLine(input: $input) {
      purchaseOrderLine {
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
