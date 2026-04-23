import { gql } from '@apollo/client'

export const totalsFragment = gql`
  fragment TotalsFragment on Totals {
    creditTalent
    creditCompany
    creditCommissions
    debitTalent
    debitCompany
    debitCommissions
    paidTalent
    paidCompany
    paidCommissions
  }
`
