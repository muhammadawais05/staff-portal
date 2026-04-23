import { SyntheticEvent } from 'react'
import { kebabCase } from 'lodash-es'
import { ModalData } from '@staff-portal/billing/src/store/modalActions'
import { ModalKey } from '@staff-portal/billing/src/@types/types'

type PaymentHandleOnActionClick = {
  handleOnOpenModal: (modalName: ModalKey, options?: ModalData) => void
}

const modalNameByActionName: { [actionName: string]: ModalKey } = {
  addDocumentNote: ModalKey.commercialDocumentAddNote,
  addMemorandumToCommercialDocument: ModalKey.memorandumAdd,
  applyUnallocatedMemorandumsToCommercialDocument: ModalKey.paymentApplyMemos,
  cancelPayment: ModalKey.paymentCancel,
  convertPaymentIntoCreditMemorandum: ModalKey.paymentConvertIntoCreditMemo,
  disputeCommercialDocument: ModalKey.commercialDocumentDisputeRequest,
  editDocumentNote: ModalKey.commercialDocumentEditNote,
  payPayment: ModalKey.paymentPay,
  resolveDisputeOfCommercialDocument: ModalKey.commercialDocumentDisputeResolve,
  updateCommercialDocumentDueDate: ModalKey.commercialDocumentUpdateDueDate
}

export const paymentActionHandler =
  ({ handleOnOpenModal }: PaymentHandleOnActionClick) =>
  (e: SyntheticEvent<HTMLElement, Event>) => {
    // TODO: refactor documentNumber to nodeId
    const { value: actionName, documentNumber } = e.currentTarget.dataset

    if (!actionName) {
      console.warn('No valid response key provided:', actionName)

      return
    }

    const nodeType = 'payment'
    const payload: ModalData = {
      nodeId: documentNumber,
      nodeType
    }
    const modalName =
      modalNameByActionName[actionName] || `payment-${kebabCase(actionName)}`

    handleOnOpenModal(modalName, payload)
  }
