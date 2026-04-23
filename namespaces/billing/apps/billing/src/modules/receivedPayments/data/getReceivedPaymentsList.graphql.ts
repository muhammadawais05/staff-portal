import { gql } from '@apollo/client'

export default gql`
  query GetReceivedPaymentsList(
    $pagination: OffsetPagination!
    $filter: PaymentsFilter!
  ) {
    payments: paymentsNullable(filter: $filter, pagination: $pagination) {
      totalCount
      groups {
        month
        year
        payments {
          ...ReceivedPaymentListItemFragment
        }
      }
    }
  }
`
