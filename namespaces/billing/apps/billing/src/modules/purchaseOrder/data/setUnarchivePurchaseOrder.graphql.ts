import { gql } from '@apollo/client'
import { purchaseOrderFragment } from '@staff-portal/billing-widgets/src/modules/__fragments__/purchaseOrderFragment.graphql'

export default gql`
  mutation SetUnarchivePurchaseOrder($input: UnarchivePurchaseOrderInput!) {
    unarchivePurchaseOrder(input: $input) {
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
