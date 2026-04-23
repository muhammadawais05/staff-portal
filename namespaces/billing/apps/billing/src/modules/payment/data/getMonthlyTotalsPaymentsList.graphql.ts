import { gql } from '@apollo/client'
import { paymentsTotalsFragment } from '@staff-portal/billing-widgets/src/modules/__fragments__/paymentsTotalsFragment.graphql'

export default gql`
  query GetPaymentsMonthlyTotals(
    $pagination: OffsetPagination!
    $filter: PaymentsFilter!
  ) {
    payments(pagination: $pagination, filter: $filter) {
      groups {
        month
        year
        totals {
          ...PaymentsTotalsFragment
        }
      }
    }
  }

  ${paymentsTotalsFragment}
`
