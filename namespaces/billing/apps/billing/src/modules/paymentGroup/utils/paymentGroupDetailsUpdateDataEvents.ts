import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'

export const paymentGroupDetailsUpdateDataEvents = [
  ApolloContextEvents.paymentAddToGroup,
  ApolloContextEvents.paymentGroupPay,
  ApolloContextEvents.paymentGroupCancel,
  ApolloContextEvents.paymentRemoveFromGroup
]
