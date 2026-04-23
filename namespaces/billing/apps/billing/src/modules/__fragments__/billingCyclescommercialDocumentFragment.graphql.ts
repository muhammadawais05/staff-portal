import { gql } from '@apollo/client'

export const billingCyclesCommercialDocument = gql`
  fragment BillingCyclesCommercialDocumentFragment on CommercialDocument {
    gid
    amount
    status
    billingCycleGid
    url
    documentNumber
    paidAmount
    creditedAmount
    debitedAmount
  }
`
