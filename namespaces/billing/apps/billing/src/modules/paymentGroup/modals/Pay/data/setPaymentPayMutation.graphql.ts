import { gql } from '@apollo/client'
import { payPaymentSubject } from '@staff-portal/billing-widgets/src/modules/__fragments__/paymentPaySubject.graphql'

export default gql`
  mutation SetPayPaymentGroup($input: PayPaymentGroupInput!) {
    payPaymentGroup(input: $input) {
      success
      errors {
        code
        key
        message
      }
      paymentGroup {
        id
        number
        amount
        status
        subject {
          ...PaymentPaySubject
        }
      }
    }
  }

  ${payPaymentSubject}
`
