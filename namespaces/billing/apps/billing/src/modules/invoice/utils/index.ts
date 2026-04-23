import { SyntheticEvent } from 'react'
import { kebabCase } from 'lodash-es'
import {
  DocumentStatus,
  Invoice,
  InvoiceOperations,
  Maybe
} from '@staff-portal/graphql/staff'
import { ModalKey } from '@staff-portal/billing/src/@types/types'
import { ModalData } from '@staff-portal/billing/src/store/modalActions'
import { encodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'
import i18n from '@staff-portal/billing/src/utils/i18n'
import { EMPTY_DATA } from '@staff-portal/billing/src/_lib/helpers'
import { getInvoiceAmountTooltipText } from '@staff-portal/billing-widgets/src/modules/invoice/utils/getInvoiceAmountTooltipText'
import { CommercialDocumentTotals } from '@staff-portal/billing-widgets/src/modules/commercialDocument/utils'

import getInvoiceDetailsHeaderPayOperation from './getInvoiceDetailsHeaderPayOperation'

const commonInvoiceActions: (
  | keyof InvoiceOperations
  | 'downloadPdfUrl'
  | 'downloadHtmlUrl'
)[] = [
  'downloadPdfUrl',
  'downloadHtmlUrl',
  'updateDispute',
  'disputeCommercialDocument',
  'disputeTalentPayments',
  'resolveDisputeOfCommercialDocument',
  'recordBadDebt',
  'writeOff',
  'addMemorandumToCommercialDocument',
  'applyUnallocatedMemorandumsToCommercialDocument',
  'applyPrepayments'
]

const invoiceDetailsActions: (
  | keyof InvoiceOperations
  | 'downloadPdfUrl'
  | 'downloadHtmlUrl'
  | 'disabledDownloadPdfUrl'
  | 'disabledDownloadHtmlUrl'
)[] = [
  ...commonInvoiceActions,
  'addDocumentNote',
  'editDocumentNote',
  'unconsolidate',
  'updateCommercialDocumentDueDate',
  'updateIssueDate',
  'applyPromotions'
]

const invoiceListItemActions: (
  | keyof InvoiceOperations
  | 'details'
  | 'downloadPdfUrl'
  | 'downloadHtmlUrl'
)[] = [
  'details',
  ...commonInvoiceActions,
  'updateCommercialDocumentDueDate',
  'updateIssueDate'
]

const invoiceEntityOperations: (keyof InvoiceOperations)[] = [
  'addMemorandumToCommercialDocument',
  'applyPrepayments',
  'applyPromotions',
  'applyUnallocatedMemorandumsToCommercialDocument',
  'collectBadDebtInvoice',
  'disputeTalentPayments',
  'recordBadDebt',
  'disputeCommercialDocument',
  'resolveDisputeOfCommercialDocument',
  'unconsolidate',
  'updateDispute',
  'updateCommercialDocumentDueDate',
  'writeOff',
  'addDocumentNote',
  'editDocumentNote'
]

type InvoiceHandleOnActionClick = {
  handleOnApplyPromotions?: (invoiceId: string) => void
  handleOnOpenModal: (modalName: ModalKey, options?: ModalData) => void
}

const modalNameByActionName: { [actionName: string]: ModalKey } = {
  addDocumentNote: ModalKey.commercialDocumentAddNote,
  addMemorandumToCommercialDocument: ModalKey.memorandumAdd,
  applyUnallocatedMemorandumsToCommercialDocument: ModalKey.invoiceApplyMemos,
  collectBadDebtInvoice: ModalKey.invoiceCollectBadDebt,
  disputeCommercialDocument: ModalKey.commercialDocumentDisputeRequest,
  updateCommercialDocumentDueDate: ModalKey.commercialDocumentUpdateDueDate,
  disputeTalentPayments: ModalKey.invoiceDisputeTalent,
  editDocumentNote: ModalKey.commercialDocumentEditNote,
  [ModalKey.invoicePay]: ModalKey.invoicePay,
  resolveDisputeOfCommercialDocument: ModalKey.commercialDocumentDisputeResolve,
  updateDispute: ModalKey.invoiceDisputeUpdate,
  updateIssueDate: ModalKey.invoiceUpdateIssueDate,
  applyPrepayments: ModalKey.invoiceApplyPrepayments
}

const invoiceActionHandler =
  ({
    handleOnApplyPromotions,
    handleOnOpenModal
  }: // TODO : decompose to factory
  // eslint-disable-next-line complexity
  InvoiceHandleOnActionClick) =>
  (e: SyntheticEvent<HTMLElement, Event>) => {
    // TODO: refactor documentNumber to nodeId
    const { value: actionName, documentNumber } = e.currentTarget.dataset

    if (!actionName) {
      console.warn('No valid response key provided:', actionName)

      return
    }

    const nodeType = 'invoice'
    const payload: ModalData = {
      nodeId: documentNumber,
      nodeType
    }
    const modalName =
      modalNameByActionName[actionName] || `invoice-${kebabCase(actionName)}`

    switch (actionName) {
      case 'addDocumentNote':
      case 'addMemorandumToCommercialDocument':
      case 'disputeCommercialDocument':
      case 'editDocumentNote':
      case ModalKey.invoicePay:
      case 'updateDispute':
      case 'updateCommercialDocumentDueDate':
      case 'resolveDisputeOfCommercialDocument':
      case 'unconsolidate':
      case 'writeOff':
      case 'updateIssueDate':
      case 'recordBadDebt':
      case 'disputeTalentPayments':
      case 'applyPrepayments':
        return handleOnOpenModal(modalName, payload)

      case 'applyUnallocatedMemorandumsToCommercialDocument':
        return handleOnOpenModal(ModalKey.invoiceApplyMemos, payload)

      case 'applyPromotions':
        return handleOnApplyPromotions?.(
          encodeId({
            id: documentNumber as string,
            type: nodeType
          })
        )

      default:
        return handleOnOpenModal(modalName, {
          invoiceId: documentNumber
        })
    }
  }

const invoiceTotalSortOrder: (keyof CommercialDocumentTotals)[] = [
  'draft',
  'outstanding',
  'overdue',
  'disputed',
  'inCollections',
  'writtenOff',
  'pendingReceipt',
  'credited',
  'paid'
]

const PENDING_TO_RECEIVE_STATUSES = [
  DocumentStatus.OUTSTANDING,
  DocumentStatus.OVERDUE,
  DocumentStatus.PENDING_RECEIPT,
  DocumentStatus.IN_COLLECTIONS
]

const PENDING_TO_PAY_STATUSES = [
  DocumentStatus.OUTSTANDING,
  DocumentStatus.OVERDUE
]

const getInvoiceDuePeriodText = (duePeriod?: number) => {
  if (typeof duePeriod === 'number') {
    if (duePeriod <= 0) {
      return i18n.t('invoice:invoiceDetails.duePeriodUponReceipt')
    }

    return i18n.t('invoice:invoiceDetails.duePeriodValue', { duePeriod })
  }

  return EMPTY_DATA
}

const isInvoiceOriginal = ({
  consolidatedInvoice
}: {
  consolidatedInvoice?: Maybe<{ id?: string }>
}) => {
  // Defines if an invoice was consolidated ("original" seems to be not
  // the best name in the world, but it's widely used across the finance team to
  // name these invoices).
  return !!consolidatedInvoice?.id
}

const isInvoicePayable = (
  invoice: Pick<Invoice, 'cleanAmountToPay' | 'status'> &
    Parameters<typeof isInvoiceOriginal>[0]
) => {
  const { cleanAmountToPay, status } = invoice

  const original = isInvoiceOriginal(invoice)
  const isPendingToReceive = PENDING_TO_RECEIVE_STATUSES.includes(status)
  const hasCleanAmountToPay = Number(cleanAmountToPay) > 0

  return !original && isPendingToReceive && hasCleanAmountToPay
}

export {
  getInvoiceAmountTooltipText,
  getInvoiceDetailsHeaderPayOperation,
  getInvoiceDuePeriodText,
  invoiceActionHandler,
  invoiceDetailsActions,
  invoiceEntityOperations,
  invoiceListItemActions,
  invoiceTotalSortOrder,
  isInvoiceOriginal,
  isInvoicePayable,
  PENDING_TO_PAY_STATUSES,
  PENDING_TO_RECEIVE_STATUSES
}

export { mapPurchaseOrdersToSelectOptions } from './map-purchase-orders-to-select-options'
