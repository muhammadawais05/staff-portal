import { gql } from '@apollo/client'

export const paymentsTotalsFragment = gql`
  fragment PaymentsTotalsFragment on PaymentsTotals {
    debited
    disputed
    due
    onHold
    outstanding
    overdue
    paid
  }
`
