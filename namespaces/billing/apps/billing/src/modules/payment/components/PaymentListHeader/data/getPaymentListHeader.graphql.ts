import { gql } from '@apollo/client'
import { operationItemFragment } from '@staff-portal/billing/src/__fragments__/operationItemFragment.graphql'

export default gql`
  query GetPaymentsListHeader(
    $pagination: OffsetPagination!
    $filter: PaymentsFilter!
  ) {
    payments(pagination: $pagination, filter: $filter) {
      alreadyDownloadedCount
      totalCount
      operations {
        createPaymentGroup {
          ...OperationItem
        }
        downloadPaymentsFromSearch {
          ...OperationItem
        }
        payMultiplePayments {
          ...OperationItem
        }
      }
    }
  }

  ${operationItemFragment}
`
