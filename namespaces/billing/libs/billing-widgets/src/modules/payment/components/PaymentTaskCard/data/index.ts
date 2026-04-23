import { useGetNode } from '@staff-portal/billing/src/utils/graphql'

import { useGetPaymentTaskCardQuery } from './getPaymentTaskCard.graphql.types'

export const useGetPaymentTaskCard = (paymentId: string) =>
  useGetNode(useGetPaymentTaskCardQuery)({ paymentId })
