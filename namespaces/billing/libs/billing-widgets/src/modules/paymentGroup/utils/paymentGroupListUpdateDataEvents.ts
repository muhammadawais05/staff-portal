import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'

export const paymentGroupListUpdateDataEvents = [
  ApolloContextEvents.payPaymentGroups,
  ApolloContextEvents.paymentGroupPay,
  ApolloContextEvents.paymentGroupCancel
]
