import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'

export const paymentListUpdateDataEvents = [
  ApolloContextEvents.paymentCreateGroup,
  ApolloContextEvents.commercialDocumentApplyMemos,
  ApolloContextEvents.commercialDocumentDisputeRequest,
  ApolloContextEvents.commercialDocumentDisputeResolve,
  ApolloContextEvents.commercialDocumentUpdateDueDate,
  ApolloContextEvents.convertPaymentIntoCreditMemorandum,
  ApolloContextEvents.memorandumAdd,
  ApolloContextEvents.memorandumRevert,
  ApolloContextEvents.memorandumRevertPrepayment,
  ApolloContextEvents.paymentCancel,
  ApolloContextEvents.paymentMultiplePay,
  ApolloContextEvents.paymentPay
]

export const paymentDetailsUpdateDataEvents = [
  ApolloContextEvents.commercialDocumentAddNote,
  ApolloContextEvents.commercialDocumentEditNote,
  ApolloContextEvents.paymentCancel,
  ApolloContextEvents.transferClaimRefund,
  ApolloContextEvents.transferMarkFailed,
  ApolloContextEvents.transferPay,
  ApolloContextEvents.transferPostpone,
  ...paymentListUpdateDataEvents
]
