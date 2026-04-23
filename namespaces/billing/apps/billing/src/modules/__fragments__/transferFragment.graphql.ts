import { gql } from '@apollo/client'

export default gql`
  fragment TransferFragment on Transfer {
    amount
    amountToRefund
    billingOption {
      id
      ... on CreditCardBillingOption {
        id
        cardExpired
        last4Digits
        type
        verificationStatuses
      }
    }
    createdAt
    description
    effectiveDate
    feesTotalAmount
    gateway
    id
    document {
      id
    }
    paymentMethod
    refund
    status
    ...TransferOperations
  }
`
