import { gql } from '@apollo/client'
import { operationItemFragment } from '@staff-portal/billing/src/__fragments__/operationItemFragment.graphql'

import { paymentListItemFragment } from '../../__fragments__/paymentListItemFragment.graphql'

export default gql`
  query GetPaymentGroupDetailsPayments(
    $nodeId: ID!
    $pagination: OffsetPagination
  ) {
    node(id: $nodeId) {
      ... on PaymentGroup {
        id
        payments(pagination: $pagination) {
          totalCount
          alreadyDownloadedCount
          groups {
            month
            year
            totals {
              debited
              disputed
              due
              onHold
              outstanding
              overdue
              paid
            }
            payments {
              ...PaymentListItemFragment
              operations {
                ...PaymentGroupDetailsPaymentsOperations
              }
            }
          }
        }
      }
    }
  }

  fragment PaymentGroupDetailsPaymentsOperations on PaymentOperations {
    removePaymentFromPaymentGroup {
      ...OperationItem
    }
  }

  ${operationItemFragment}
  ${paymentListItemFragment}
`
