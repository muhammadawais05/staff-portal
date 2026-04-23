import { gql } from '@apollo/client'
import { paymentsTotalsFragment } from '@staff-portal/billing-widgets/src/modules/__fragments__/paymentsTotalsFragment.graphql'

export default gql`
  query GetPaymentGroupDetailsTotals(
    $nodeId: ID!
    $pagination: OffsetPagination!
  ) {
    node(id: $nodeId) {
      ... on PaymentGroup {
        id
        payments(pagination: $pagination) {
          totalCount
          totals {
            ...PaymentsTotalsFragment
          }
        }
      }
    }
  }

  ${paymentsTotalsFragment}
`
