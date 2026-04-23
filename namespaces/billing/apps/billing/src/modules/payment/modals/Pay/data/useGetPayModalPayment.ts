import { useGetNode } from '@staff-portal/billing/src/utils/graphql'

import { useGetPayModalPaymentQuery } from './getPayModalPayment.graphql.types'

export const useGetPayModalPayment = (paymentId: string) =>
  useGetNode(useGetPayModalPaymentQuery)(
    { id: paymentId },
    { fetchPolicy: 'network-only' }
  )
