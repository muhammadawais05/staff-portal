import React from 'react'
import { Modal } from '@staff-portal/modals-service'
import { NodeType } from '@staff-portal/graphql'

import { AddNewTopscreenPositionForm } from './components'

interface Props {
  topscreenClientId: string
  hideModal: () => void
}

const AddNewTopscreenPositionModal = ({
  topscreenClientId,
  hideModal
}: Props) => {
  return (
    <Modal
      operationVariables={{
        nodeId: topscreenClientId,
        nodeType: NodeType.TOPSCREEN_CLIENT,
        operationName: 'createTopscreenPosition'
      }}
      onClose={hideModal}
      open
      size='small'
    >
      <AddNewTopscreenPositionForm
        topscreenClientId={topscreenClientId}
        hideModal={hideModal}
      />
    </Modal>
  )
}

AddNewTopscreenPositionModal.defaultProps = {}

AddNewTopscreenPositionModal.displayName = 'AddNewTopscreenPositionModal'

export default AddNewTopscreenPositionModal
