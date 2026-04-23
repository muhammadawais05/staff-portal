import { gql } from '@apollo/client'
import { operationItemFragment } from '@staff-portal/billing/src/__fragments__/operationItemFragment.graphql'

export default gql`
  mutation CancelPaymentGroup($input: CancelPaymentGroupInput!) {
    cancelPaymentGroup(input: $input) {
      paymentGroup {
        id
        amount
        createdOn
        number
        status
        operations {
          cancelPaymentGroup {
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
