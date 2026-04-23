import { SyntheticEvent } from 'react'
import { ModalData } from '@staff-portal/billing/src/store/modalActions'
import { ModalKey } from '@staff-portal/billing/src/@types/types'

type PaymentHandleOnActionClick = {
  handleOnRemovePaymentFromPaymentGroup?: ({
    paymentId,
    warningType
  }: {
    paymentId: string
    warningType?: 'withheld'
  }) => void
  handleOnRevertPaymentToPaymentGroup?: ({
    paymentId,
    paymentGroupId
  }: {
    paymentId: string
    paymentGroupId: string
  }) => void
  handleOnOpenModal: (modalName: ModalKey, options?: ModalData) => void
}

export enum PaymentGroupAction {
  REMOVE_PAYMENT = 'removePaymentFromPaymentGroup',
  REVERT_PAYMENT = 'revertPaymentToPaymentGroup',
  PAY = 'payPaymentGroup',
  CANCEL = 'cancelPaymentGroup'
}

const modalNameByActionName: Partial<{ [K in PaymentGroupAction]: ModalKey }> =
  {
    [PaymentGroupAction.PAY]: ModalKey.paymentGroupPay,
    [PaymentGroupAction.CANCEL]: ModalKey.paymentGroupCancel
  }

export const paymentGroupActionHandler =
  ({
    handleOnRemovePaymentFromPaymentGroup,
    handleOnRevertPaymentToPaymentGroup,
    handleOnOpenModal
  }: PaymentHandleOnActionClick) =>
  (e: SyntheticEvent<HTMLElement, Event>) => {
    const dataset = e.currentTarget.dataset
    const {
      value: actionValue = '',
      nodeId = '',
      groupId = '',
      warningType
    } = dataset
    const actionName = actionValue as PaymentGroupAction

    if (!actionName) {
      console.warn('No valid action name provided:', dataset)

      return
    }

    const nodeType = 'paymentGroup'
    const payload: ModalData = {
      nodeId,
      nodeType
    }

    const modalName = modalNameByActionName[actionName]

    switch (actionName) {
      case PaymentGroupAction.REMOVE_PAYMENT:
        return handleOnRemovePaymentFromPaymentGroup?.({
          paymentId: nodeId,
          warningType: warningType as 'withheld' | undefined
        })

      case PaymentGroupAction.REVERT_PAYMENT:
        return handleOnRevertPaymentToPaymentGroup?.({
          paymentId: nodeId,
          paymentGroupId: groupId
        })

      default:
        if (!modalName) {
          console.warn('No valid modal name provided:', modalName)

          return
        }

        handleOnOpenModal(modalName, payload)
    }
  }
