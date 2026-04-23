import React from 'react'
import { Modal } from '@staff-portal/modals-service'
import { NodeType } from '@staff-portal/graphql'
import { lazy } from '@staff-portal/utils'

export type Props = {
  engagementId: string
  hideModal: () => void
  isTopModal: boolean
}

const SendTopModalContent = lazy(
  () => import('./components/SendTopModalContent/SendTopModalContent')
)

const SendTopModal = ({ engagementId, hideModal, isTopModal }: Props) => {
  if (!isTopModal) {
    return null
  }

  return (
    <Modal
      open
      onClose={hideModal}
      size='small'
      data-testid='send-top-modal'
      defaultTitle='Send TOP'
      operationVariables={{
        nodeId: engagementId,
        nodeType: NodeType.ENGAGEMENT,
        operationName: 'sendTop'
      }}
    >
      <SendTopModalContent hideModal={hideModal} engagementId={engagementId} />
    </Modal>
  )
}

export default SendTopModal
