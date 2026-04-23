import React from 'react'
import { Modal, ModalForm } from '@staff-portal/modals-service'
import { lazy } from '@staff-portal/utils'

import { ClientClaimingOperationsFragment } from '../../data/client-claiming-operations-fragment'
import { LogSalesCallBusinessAction } from '../../types'

const LogSalesCallActionsModalContent = lazy(
  () => import('./components/LogSalesCallActionsModalContent')
)

interface Props {
  clientId: string
  operations?: ClientClaimingOperationsFragment
  hideModal: () => void
  onSubmit: (companyAction: LogSalesCallBusinessAction) => void
}

const LogSalesCallActionsModal = ({
  clientId,
  operations,
  hideModal,
  onSubmit
}: Props) => {
  const handleSubmit = ({
    companyAction
  }: {
    companyAction: LogSalesCallBusinessAction
  }) => {
    hideModal()
    onSubmit(companyAction)
  }

  return (
    <Modal onClose={hideModal} size='small' open>
      <ModalForm title='Sales Call Notes Saved' onSubmit={handleSubmit}>
        <LogSalesCallActionsModalContent
          operations={operations}
          clientId={clientId}
          hideModal={hideModal}
        />
      </ModalForm>
    </Modal>
  )
}

export default LogSalesCallActionsModal
