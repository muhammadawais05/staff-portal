import { gql, useMutation } from '@staff-portal/data-layer-service'

import {
  CreatePaymentHoldDocument,
  CreatePaymentHoldMutation
} from './use-create-payment-hold.staff.gql.types'

export const CREATE_PAYMENT_HOLD: typeof CreatePaymentHoldDocument = gql`
  mutation CreatePaymentHold($input: CreatePaymentHoldInput!) {
    createPaymentHold(input: $input) {
      success
      errors {
        code
        key
        message
      }
    }
  }
`

export const useCreatePaymentHold = ({
  onError,
  onCompleted
}: {
  onError: (error: Error) => void
  onCompleted?: (data: CreatePaymentHoldMutation) => void
}) =>
  useMutation(CREATE_PAYMENT_HOLD, {
    onError,
    onCompleted
  })
