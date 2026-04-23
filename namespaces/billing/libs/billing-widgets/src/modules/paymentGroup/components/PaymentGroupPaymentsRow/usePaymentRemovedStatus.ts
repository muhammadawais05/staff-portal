import { useCallback, useState } from 'react'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'

import { PaymentListItemFragment } from '../../../__fragments__/paymentListItemFragment.graphql.types'

export const usePaymentRemovedStatus = (payment: PaymentListItemFragment) => {
  const { id: paymentId, paymentGroup } = payment

  const [paymentRemoved, setPaymentRemoved] = useState(!paymentGroup)
  const syncRemoveStatus = useCallback(
    ({
      paymentId: emittedId,
      removed
    }: {
      paymentId: string
      removed: boolean
    }) => {
      if (paymentId === emittedId) {
        setPaymentRemoved(removed)
      }
    },
    [paymentId, setPaymentRemoved]
  )

  useMessageListener(
    [
      ApolloContextEvents.paymentRemoveFromGroup,
      ApolloContextEvents.paymentAddToGroup
    ],
    syncRemoveStatus
  )

  return {
    paymentRemoved
  }
}
