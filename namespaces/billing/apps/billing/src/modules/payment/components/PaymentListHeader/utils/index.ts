import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'

export const paymentListUpdateEvents = [
  ApolloContextEvents.paymentCreateGroup,
  ApolloContextEvents.paymentMultiplePay,
  ApolloContextEvents.paymentDownloadFromSearch
]
