import React from 'react'
import { Modal } from '@staff-portal/modals-service'
import { NodeType } from '@staff-portal/graphql'

import ChangeSourcerModalContent from '../ChangeSourcerModalContent'

export interface Props {
  hideModal: () => void
  talentId: string
}

const ChangeSourcerModal = ({ hideModal, talentId }: Props) => {
  return (
    <Modal
      open
      onClose={hideModal}
      operationVariables={{
        nodeId: talentId,
        nodeType: NodeType.TALENT,
        operationName: 'changeTalentSourcer'
      }}
    >
      <ChangeSourcerModalContent talentId={talentId} hideModal={hideModal} />
    </Modal>
  )
}

export default ChangeSourcerModal
