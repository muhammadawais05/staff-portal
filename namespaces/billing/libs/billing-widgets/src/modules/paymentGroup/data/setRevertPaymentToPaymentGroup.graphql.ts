import { gql } from '@apollo/client'

import { paymentMutationFragment } from '../../__fragments__/paymentMutationFragment.graphql'

export default gql`
  mutation SetRestorePaymentToPaymentGroup(
    $input: AddPaymentToPaymentGroupInput!
  ) {
    addPaymentToPaymentGroup(input: $input) {
      payment {
        ...PaymentMutationFragment
      }
      notice
      success
      errors {
        key
        message
        code
      }
    }
  }

  ${paymentMutationFragment}
`
