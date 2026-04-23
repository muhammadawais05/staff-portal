import { SyntheticEvent } from 'react'
import { kebabCase } from 'lodash-es'
import { ModalData } from '@staff-portal/billing/src/store/modalActions'
import { ModalKey } from '@staff-portal/billing/src/@types/types'

interface MemorandumActionHandler {
  handleOnOpenModal: (modalName: ModalKey, options?: ModalData) => void
}

const modalNameByActionName: { [actionName: string]: ModalKey } = {
  revertInvoicePrepayments: ModalKey.memorandumRevertPrepayment,
  revertRoleMemorandum: ModalKey.revertRoleMemorandum,
  revertCommercialDocumentMemorandum:
    ModalKey.revertCommercialDocumentMemorandum
}

export const memorandumActionHandler =
  ({ handleOnOpenModal }: MemorandumActionHandler) =>
  (e: SyntheticEvent<HTMLElement, Event>) => {
    const { value: actionName, nodeId } = e.currentTarget.dataset

    if (!actionName) {
      console.warn('No valid response key provided:', actionName)

      return
    }

    const nodeType = 'memorandum'
    const payload: ModalData = {
      nodeId,
      nodeType
    }
    const modalName =
      modalNameByActionName[actionName] || `memorandum-${kebabCase(actionName)}`

    handleOnOpenModal(modalName, payload)
  }
