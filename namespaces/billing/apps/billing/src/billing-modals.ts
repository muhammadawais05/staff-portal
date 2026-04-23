/* eslint-disable max-lines */
import { lazy } from '@staff-portal/utils'
import { ModalPathsMap } from '@staff-portal/billing/src/components/ModalsState/ModalsState'
import { ModalKey } from '@staff-portal/billing/src/@types/types'

export const BillingAppModalsPathsMap: ModalPathsMap = {
  [ModalKey.receivedPaymentsHistory]: lazy(
    () => import('./modules/receivedPayments/modals/PaymentsHistoryModal')
  ),
  [ModalKey.receivedPaymentsCommissions]: lazy(
    () => import('./modules/receivedPayments/modals/DownloadCommissionsModal')
  ),
  [ModalKey.receivedPaymentsProjections]: lazy(
    () => import('./modules/receivedPayments/modals/ShowProjectionsModal')
  ),
  [ModalKey.commercialDocumentDisputeRequest]: lazy(
    () => import('./modules/commercialDocument/modals/DisputeModal')
  ),
  [ModalKey.memorandumAdd]: lazy(
    () => import('./modules/commercialDocument/modals/MemorandumAddModal')
  ),
  [ModalKey.paymentConvertIntoCreditMemo]: lazy(
    () => import('./modules/payment/modals/PaymentConvertToCreditMemoModal')
  ),
  [ModalKey.commercialDocumentDisputeResolve]: lazy(
    () => import('./modules/commercialDocument/modals/DisputeResolveModal')
  ),
  [ModalKey.invoiceDisputeUpdate]: lazy(
    () => import('./modules/commercialDocument/modals/DisputeModal')
  ),
  [ModalKey.invoiceWriteOff]: lazy(
    () => import('./modules/invoice/modals/WriteOffModal')
  ),
  [ModalKey.invoiceUnconsolidate]: lazy(
    () => import('./modules/invoice/modals/UnconsolidateModal')
  ),
  [ModalKey.commercialDocumentUpdateDueDate]: lazy(
    () => import('./modules/commercialDocument/modals/UpdateDueDateModal')
  ),
  [ModalKey.invoiceUpdateIssueDate]: lazy(
    () => import('./modules/invoice/modals/UpdateIssueDateModal')
  ),
  [ModalKey.commercialDocumentAddNote]: lazy(
    () => import('./modules/commercialDocument/modals/AddDocumentNote')
  ),
  [ModalKey.revertCommercialDocumentMemorandum]: lazy(
    () => import('./modules/commercialDocument/modals/RevertMemorandum')
  ),
  [ModalKey.revertRoleMemorandum]: lazy(
    () => import('./modules/memorandum/modals/RevertRoleMemorandum')
  ),
  [ModalKey.memorandumRevertPrepayment]: lazy(
    () => import('./modules/memorandum/modals/RevertPrepaymentModal')
  ),
  [ModalKey.commercialDocumentEditNote]: lazy(
    () => import('./modules/commercialDocument/modals/EditDocumentNote')
  ),
  [ModalKey.noteCreate]: lazy(
    () => import('./modules/notable/components/NoteCreateModalWrapper')
  ),
  [ModalKey.noteEdit]: lazy(
    () => import('./modules/notable/components/NoteEditModalWrapper')
  ),
  [ModalKey.consolidatedInvoiceCreate]: lazy(
    () => import('./modules/invoice/modals/CreateConsolidatedInvoiceModal')
  ),
  [ModalKey.invoicePay]: lazy(
    () => import('./modules/commercialDocument/modals/Pay')
  ),
  [ModalKey.paymentPay]: lazy(() => import('./modules/payment/modals/Pay')),
  [ModalKey.paymentCancel]: lazy(
    () => import('./modules/payment/modals/Cancel')
  ),
  [ModalKey.paymentPayMultiple]: lazy(
    () => import('./modules/payment/modals/PaymentMultiplePayModal')
  ),
  [ModalKey.paymentGroupPay]: lazy(
    () => import('./modules/paymentGroup/modals/Pay')
  ),
  [ModalKey.paymentGroupPayMultiple]: lazy(
    () => import('./modules/paymentGroup/modals/PaymentGroupMultiplePayModal')
  ),
  [ModalKey.paymentGroupCancel]: lazy(
    () => import('./modules/paymentGroup/modals/Cancel')
  ),
  [ModalKey.transferCancel]: lazy(
    () => import('./modules/transfer/modals/Cancel')
  ),
  [ModalKey.transferClaimRefund]: lazy(
    () => import('./modules/transfer/modals/ClaimRefund')
  ),
  [ModalKey.transferMarkFailed]: lazy(
    () => import('./modules/transfer/modals/MarkFailed')
  ),
  [ModalKey.transferPay]: lazy(() => import('./modules/transfer/modals/Pay')),
  [ModalKey.transferPostpone]: lazy(
    () => import('./modules/transfer/modals/Postpone')
  ),
  [ModalKey.transferRollback]: lazy(
    () => import('./modules/transfer/modals/Rollback')
  ),
  [ModalKey.invoiceApplyMemos]: lazy(
    () =>
      import('./modules/commercialDocument/modals/ApplyUnallocatedMemorandums')
  ),
  [ModalKey.paymentApplyMemos]: lazy(
    () =>
      import('./modules/commercialDocument/modals/ApplyUnallocatedMemorandums')
  ),
  [ModalKey.invoiceAssignPurchaseOrder]: lazy(
    () => import('./modules/invoice/modals/AssignPurchaseOrderModal')
  ),
  [ModalKey.purchaseOrderCreate]: lazy(
    () => import('./modules/purchaseOrder/modals/Create')
  ),
  [ModalKey.purchaseOrderEdit]: lazy(
    () => import('./modules/purchaseOrder/modals/Edit')
  ),
  [ModalKey.invoiceApplyPrepayments]: lazy(
    () =>
      import(
        './modules/invoice/modals/ApplyPrepaymentsModal/ApplyPrepaymentsModal'
      )
  ),
  [ModalKey.invoiceCollectBadDebt]: null, // this modal cannot be opened straight ahead
  [ModalKey.invoiceRecordBadDebt]: lazy(
    () => import('./modules/invoice/modals/RecordBadDebtModal')
  ),
  [ModalKey.invoiceDisputeTalent]: lazy(
    () => import('./modules/invoice/modals/DisputeTalentModal')
  )
}
