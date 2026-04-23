import { gql } from '@apollo/client'
import { webResourceFragment } from '@staff-portal/billing/src/__fragments__/webResourceFragment.graphql'
import { paymentOperationsFragment } from '@staff-portal/billing/src/__fragments__/paymentOperationsFragment.graphql'
import { billingOptionFragment } from '@staff-portal/billing-widgets/src/modules/__fragments__/billingOptionFragment.graphql'
import { paymentListItemFragment } from '@staff-portal/billing-widgets/src/modules/__fragments__/paymentListItemFragment.graphql'
import { paymentSubjectNameFragment } from '@staff-portal/billing-widgets/src/modules/__fragments__/paymentSubjectNameFragment.graphql'
import { paymentWebResourceFragment } from '@staff-portal/billing-widgets/src/modules/__fragments__/paymentWebResourceFragment.graphql'

export default gql`
  query GetPaymentsList(
    $pagination: OffsetPagination!
    $filter: PaymentsFilter!
  ) {
    payments: paymentsNullable(filter: $filter, pagination: $pagination) {
      totalCount
      groups {
        month
        year
        payments {
          ...PaymentListItemFragment
        }
      }
    }
  }

  ${webResourceFragment}
  ${billingOptionFragment}
  ${paymentListItemFragment}
  ${paymentOperationsFragment}
  ${paymentSubjectNameFragment}
  ${paymentWebResourceFragment}
`
