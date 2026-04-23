import { MemorandumOperations } from '@staff-portal/graphql/staff'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'

type MemorandumOperationsType = keyof MemorandumOperations

const commonMemorandumActions: (
  | MemorandumOperationsType
  | 'downloadHtmlUrl'
  | 'downloadPdfUrl'
)[] = ['downloadHtmlUrl', 'downloadPdfUrl']

export const memorandumListItemActions: (
  | MemorandumOperationsType
  | 'details'
  | 'downloadHtmlUrl'
  | 'downloadPdfUrl'
)[] = ['details', ...commonMemorandumActions, 'revertRoleMemorandum']

export const memorandumListUpdateDataEvents = [
  ApolloContextEvents.memorandumAdd,
  ApolloContextEvents.memorandumRevert,
  ApolloContextEvents.memorandumRevertPrepayment
]

export const memorandumActions = [
  ...commonMemorandumActions,
  'revertInvoicePrepayments',
  'revertCommercialDocumentMemorandum'
]

export const memorandumDataEvents = [
  ApolloContextEvents.commercialDocumentApplyMemos,
  ApolloContextEvents.invoiceApplyPromotions,
  ApolloContextEvents.memorandumAdd,
  ApolloContextEvents.convertPaymentIntoCreditMemorandum,
  ApolloContextEvents.memorandumRevert,
  ApolloContextEvents.memorandumRevertPrepayment,
  ApolloContextEvents.invoiceApplyPrepayments,
  ApolloContextEvents.invoiceUnconsolidate
]

export { useMemorandumActionHandler } from './useMemorandumActionHandler'
