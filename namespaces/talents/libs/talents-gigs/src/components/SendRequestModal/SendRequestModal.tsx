import React from 'react'
import { GigReachOutStatus } from '@staff-portal/graphql/staff'
import { Modal } from '@staff-portal/modals-service'
import { lazy } from '@staff-portal/utils'

const SendRequestModalContent = lazy(
  () => import('./containers/SendRequestModalContent/SendRequestModalContent')
)

interface SendRequestModalProps {
  talentName: string
  candidateId: string
  gigId: string
  hideModal: () => void
  onSuccessAction: (status: GigReachOutStatus | undefined) => void
}

const SendRequestModal = ({
  talentName,
  candidateId,
  gigId,
  hideModal,
  onSuccessAction
}: SendRequestModalProps) => {
  return (
    <Modal
      size='large'
      open
      onClose={hideModal}
      data-testid='send-request-modal'
    >
      <SendRequestModalContent
        candidateId={candidateId}
        gigId={gigId}
        talentName={talentName}
        onSuccessAction={onSuccessAction}
        hideModal={hideModal}
      />
    </Modal>
  )
}

export default SendRequestModal
