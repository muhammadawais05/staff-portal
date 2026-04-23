import { gql } from '@apollo/client'

export const commercialDocumentFragment = gql`
  fragment CommercialDocumentItem on CommercialDocument {
    amount
    billingCycleGid
    createdOn
    creditedAmount
    debitedAmount
    description
    documentNumber
    dueDate
    id
    paidAmount
    status
    transfers {
      nodes {
        id
        paymentMethod
        refund
        status
      }
    }
  }
`
