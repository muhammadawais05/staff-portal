import { gql } from '@apollo/client'

export default gql`
  mutation SetUnarchivePurchaseOrderLine(
    $input: UnarchivePurchaseOrderLineInput!
  ) {
    unarchivePurchaseOrderLine(input: $input) {
      purchaseOrderLine {
        ...PurchaseOrderLineFragment
      }
      success
      errors {
        code
        key
        message
      }
    }
  }
`
