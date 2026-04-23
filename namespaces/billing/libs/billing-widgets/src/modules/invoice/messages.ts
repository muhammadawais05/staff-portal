import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'

export const invoiceListUpdateDataEvents = [
  ApolloContextEvents.commercialDocumentApplyMemos,
  ApolloContextEvents.commercialDocumentDisputeRequest,
  ApolloContextEvents.commercialDocumentDisputeResolve,
  ApolloContextEvents.commercialDocumentUpdateDueDate,
  ApolloContextEvents.invoiceAssignPurchaseOrder,
  ApolloContextEvents.invoiceCollectBadDebt,
  ApolloContextEvents.invoiceConsolidatedCreate,
  ApolloContextEvents.invoiceDisputeUpdate,
  ApolloContextEvents.invoiceApplyPrepayments,
  ApolloContextEvents.invoicePay,
  ApolloContextEvents.invoiceRecordBadDebt,
  ApolloContextEvents.invoiceUnconsolidate,
  ApolloContextEvents.invoiceWriteOff,
  ApolloContextEvents.memorandumAdd,
  ApolloContextEvents.memorandumRevert,
  ApolloContextEvents.memorandumRevertPrepayment,
  ApolloContextEvents.transferClaimRefund,
  ApolloContextEvents.transferCancel,
  ApolloContextEvents.transferRollback,
  ApolloContextEvents.transferMarkFailed,
  ApolloContextEvents.transferPay,
  ApolloContextEvents.transferPostpone
]

export const invoiceDetailsUpdateDataEvents = [
  ApolloContextEvents.commercialDocumentAddNote,
  ApolloContextEvents.commercialDocumentEditNote,
  ApolloContextEvents.noteCreate,
  ApolloContextEvents.noteDelete,
  ApolloContextEvents.noteDeleteAttachment,
  ApolloContextEvents.noteUpdate,
  ...invoiceListUpdateDataEvents
]
