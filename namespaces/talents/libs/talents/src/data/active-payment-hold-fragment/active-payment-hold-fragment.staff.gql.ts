import { gql } from '@staff-portal/data-layer-service'

export const ACTIVE_PAYMENT_HOLD_FRAGMENT = gql`
  fragment ActivePaymentHoldFragment on Talent {
    id
    paymentsHoldDescription

    activePaymentHold {
      amountThreshold
      dateThreshold
    }
  }
`
