import { gql } from '@apollo/client'
import { operationItemFragment } from '@staff-portal/billing/src/__fragments__/operationItemFragment.graphql'

export default gql`
  query GetPaymentGroupsListHeader(
    $pagination: OffsetPagination!
    $filter: PaymentGroupsFilter!
  ) {
    paymentGroups(pagination: $pagination, filter: $filter) {
      operations {
        payPaymentGroups {
          ...OperationItem
        }
      }
    }
  }

  ${operationItemFragment}
`
