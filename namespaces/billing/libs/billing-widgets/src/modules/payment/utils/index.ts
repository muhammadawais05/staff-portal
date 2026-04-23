import {
  PaymentOperations,
  ExpectedCommissionKind,
  PaymentKind,
  Maybe,
  Scalars
} from '@staff-portal/graphql/staff'
import { getDifferenceInDays } from '@staff-portal/billing/src/_lib/dateTime/helper'

import { CommercialDocumentTotals } from '../../commercialDocument/utils'

type PaymentOperationsType = keyof PaymentOperations

const commonPaymentActions: (
  | PaymentOperationsType
  | 'downloadPdfUrl'
  | 'downloadHtmlUrl'
)[] = [
  'downloadPdfUrl',
  'downloadHtmlUrl',
  'disputeCommercialDocument',
  'resolveDisputeOfCommercialDocument',
  'cancelPayment',
  'addMemorandumToCommercialDocument',
  'applyUnallocatedMemorandumsToCommercialDocument',
  'convertPaymentIntoCreditMemorandum'
]

const paymentDetailsActions: (
  | PaymentOperationsType
  | 'downloadPdfUrl'
  | 'downloadHtmlUrl'
  | 'disabledDownloadPdfUrl'
  | 'disabledDownloadHtmlUrl'
)[] = [
  ...commonPaymentActions,
  'addDocumentNote',
  'editDocumentNote',
  'updateCommercialDocumentDueDate'
]

const paymentListItemActions: (
  | PaymentOperationsType
  | 'details'
  | 'downloadPdfUrl'
  | 'downloadHtmlUrl'
)[] = ['details', ...commonPaymentActions, 'updateCommercialDocumentDueDate']

const paymentEntityOperations: (keyof PaymentOperations)[] = [
  'addDocumentNote',
  'addMemorandumToCommercialDocument',
  'applyUnallocatedMemorandumsToCommercialDocument',
  'cancelPayment',
  'convertPaymentIntoCreditMemorandum',
  'disputeCommercialDocument',
  'editDocumentNote',
  'payPayment',
  'resolveDisputeOfCommercialDocument',
  'updateCommercialDocumentDueDate'
]

interface PaymentDuePeriodProps {
  createdOn: Scalars['Date']
  dueDate?: Maybe<Scalars['Date']>
}

const getPaymentDuePeriod = ({ dueDate, createdOn }: PaymentDuePeriodProps) =>
  dueDate ? getDifferenceInDays({ start: createdOn, end: dueDate }) : 0

const paymentTotalSortOrder: (keyof CommercialDocumentTotals)[] = [
  'outstanding',
  'due',
  'overdue',
  'onHold',
  'disputed',
  'debited',
  'paid'
]

const isPaymentCommission = (kind?: PaymentKind) =>
  !!kind && Object.keys(ExpectedCommissionKind).includes(kind)

export {
  getPaymentDuePeriod,
  isPaymentCommission,
  paymentDetailsActions,
  paymentEntityOperations,
  paymentListItemActions,
  paymentTotalSortOrder
}

export {
  paymentListUpdateDataEvents,
  paymentDetailsUpdateDataEvents
} from '../messages'
export { paymentActionHandler } from './paymentActionHandler'
export { usePaymentActionHandler } from './usePaymentActionHandler'
export { default as getAccountDetails } from './getAccountDetails'
export { default as getPaymentMethodsDetails } from './getPaymentMethodsDetails'
