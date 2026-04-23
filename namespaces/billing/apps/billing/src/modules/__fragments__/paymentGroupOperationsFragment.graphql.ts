import { gql } from '@apollo/client'
import { operationItemFragment } from '@staff-portal/billing/src/__fragments__/operationItemFragment.graphql'

export const paymentGroupOperationsFragment = gql`
  fragment PaymentGroupOperationsFragment on PaymentGroup {
    operations {
      applyUnallocatedMemorandums {
        ...OperationItem
      }
      cancelPaymentGroup {
        ...OperationItem
      }
      payPaymentGroup {
        ...OperationItem
      }
    }
  }

  ${operationItemFragment}
`
