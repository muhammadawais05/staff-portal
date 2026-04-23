import {
  ApolloContextEvents,
  ModalKey
} from '@staff-portal/billing/src/@types/types'

const transfersModals = [
  ModalKey.transferCancel,
  ModalKey.transferPostpone,
  ModalKey.transferRollback,
  ModalKey.transferClaimRefund,
  ModalKey.transferMarkFailed,
  ModalKey.transferPay
]

const transferTableUpdateEvents = [
  ApolloContextEvents.invoiceCollectBadDebt,
  ApolloContextEvents.invoiceApplyPrepayments,
  ApolloContextEvents.invoicePay,
  ApolloContextEvents.paymentCancel,
  ApolloContextEvents.paymentPay,
  ApolloContextEvents.transferClaimRefund,
  ApolloContextEvents.transferMarkFailed,
  ApolloContextEvents.transferPay,
  ApolloContextEvents.transferPostpone,
  ApolloContextEvents.transferRollback
]

export { transfersModals, transferTableUpdateEvents }
