import { gql } from '@apollo/client'
import { purchaseOrderFragment } from '@staff-portal/billing-widgets/src/modules/__fragments__/purchaseOrderFragment.graphql'

export default gql`
  mutation SetArchivePurchaseOrder($input: ArchivePurchaseOrderInput!) {
    archivePurchaseOrder(input: $input) {
      purchaseOrder {
        ...PurchaseOrderFragment
      }
      success
      errors {
        code
        key
        message
      }
    }
  }

  ${purchaseOrderFragment}
`
