import { gql } from '@apollo/client'

export default gql`
  mutation SetArchivePurchaseOrderLine($input: ArchivePurchaseOrderLineInput!) {
    archivePurchaseOrderLine(input: $input) {
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
