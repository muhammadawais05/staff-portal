import { Modal } from '@toptal/picasso'
import React, { FC, memo, useEffect } from 'react'

import { ModalKey } from '../../@types/types'
import { useConfirmations } from '../../_lib/customHooks/useConfirmations'
import { useModals } from '../../_lib/customHooks/useModals'
import { useStore } from '../../store'
import Confirmation from '../Confirmation'
import ModalsState from '../ModalsState'
import WidgetErrorBoundary from '../WidgetErrorBoundary'
import { useGetPageLoadModalData } from './hooks'

interface Props {
  container?: HTMLElement
}

// eslint-disable-next-line complexity
const getModalSize = (modalName: ModalKey): 'small' | 'medium' | 'large' => {
  switch (modalName) {
    case ModalKey.timesheet:
    case ModalKey.timesheetEdit:
    case ModalKey.timesheetUnsubmit:
    case ModalKey.consolidationDefaultsCreate:
    case ModalKey.consolidationDefaultsUpdate:
      return 'large'
    case ModalKey.commitmentChange:
    case ModalKey.invoiceApplyMemos:
    case ModalKey.paymentApplyMemos:
    case ModalKey.paymentPayMultiple:
    case ModalKey.paymentGroupPayMultiple:
    case ModalKey.consolidatedInvoiceCreate:
    case ModalKey.receivedPaymentsProjections:
      return 'medium'

    default:
      return 'small'
  }
}

const displayName = 'Modals'

export const Modals: FC<Props> = memo(({ container }) => {
  const { state } = useStore()
  const { handleOnOpenModal, handleOnCloseModal } = useModals()
  const { handleOnCloseConfirmation } = useConfirmations()
  const { modalName, visible } = state.modal
  const { actionTitle } = state.confirmation

  const getPageLoadModalData = useGetPageLoadModalData()

  useEffect(() => {
    const pageLoadModalData = getPageLoadModalData()

    if (!pageLoadModalData) {
      return
    }

    const { modalName: pageLoadModalName, modalOptions: pageLoadModalOptions } =
      pageLoadModalData

    handleOnOpenModal(pageLoadModalName, pageLoadModalOptions)

    // eslint-disable-next-line
  }, [])

  return (
    <Modal
      container={container}
      data-testid={`${displayName}-${modalName || actionTitle}`}
      onClose={actionTitle ? handleOnCloseConfirmation : handleOnCloseModal}
      open={visible || !!actionTitle}
      size={
        actionTitle ? 'small' : modalName ? getModalSize(modalName) : undefined
      }
    >
      {!!actionTitle && <Confirmation {...state.confirmation} />}
      <WidgetErrorBoundary>{visible && <ModalsState />}</WidgetErrorBoundary>
    </Modal>
  )
})

Modals.displayName = displayName

export default Modals
