import { gql, useMutation } from '@staff-portal/data-layer-service'

import {
  RemovePaymentHoldDocument,
  RemovePaymentHoldMutation
} from './remove-payment-hold.staff.gql.types'

export const REMOVE_PAYMENT_HOLD: typeof RemovePaymentHoldDocument = gql`
  mutation RemovePaymentHold($input: RemovePaymentHoldInput!) {
    removePaymentHold(input: $input) {
      success
      errors {
        code
        key
        message
      }
    }
  }
`

export const useRemovePaymentHold = ({
  onCompleted,
  onError
}: {
  onCompleted?: (data: RemovePaymentHoldMutation) => void
  onError?: (error: Error) => void
}) =>
  useMutation(REMOVE_PAYMENT_HOLD, {
    onCompleted,
    onError
  })
