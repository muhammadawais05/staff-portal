import { gql } from '@apollo/client'
import { paymentOperationsFragment } from '@staff-portal/billing/src/__fragments__/paymentOperationsFragment.graphql'

export const paymentMutationFragment = gql`
  fragment PaymentMutationFragment on Payment {
    createdOn
    creditedAmount
    dueDate
    id
    paidAt
    status
    ...PaymentOperationsFragment
  }

  ${paymentOperationsFragment}
`
