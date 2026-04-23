import { gql } from '@apollo/client'
import { operationItemFragment } from '@staff-portal/billing/src/__fragments__/operationItemFragment.graphql'

export default gql`
  mutation CancelPayment($input: CancelPaymentInput!) {
    cancelPayment(input: $input) {
      payment {
        id
        paymentKind
        status
        operations {
          cancelPayment {
            ...OperationItem
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

  ${operationItemFragment}
`
