import { gql } from '@apollo/client'
import { operationItemFragment } from '@staff-portal/billing/src/__fragments__/operationItemFragment.graphql'

import transferFragment from '../../../../__fragments__/transferFragment.graphql'

export default gql`
  mutation SetApplyUnallocatedMemorandumsToPaymentGroup(
    $input: ApplyUnallocatedMemorandumsToPaymentGroupInput!
  ) {
    applyUnallocatedMemorandumsToPaymentGroup(input: $input) {
      notice
      success
      errors {
        code
        key
        message
      }
      paymentGroup {
        ...PaymentGroupItem
      }
    }
  }

  ${operationItemFragment}
  ${transferFragment}
`
