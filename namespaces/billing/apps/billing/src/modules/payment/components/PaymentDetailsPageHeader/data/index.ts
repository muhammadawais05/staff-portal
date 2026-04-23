import { useGetNode } from '@staff-portal/billing/src/utils/graphql'

import { useGetPaymentDetailsHeaderQuery } from './getPaymentDetailsHeader.graphql.types'

export const useGetPaymentDetailsHeader = (paymentId: string) =>
  useGetNode(useGetPaymentDetailsHeaderQuery)({ paymentId })
