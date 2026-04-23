import React from 'react'
import { Modal } from '@staff-portal/modals-service'
import { NodeType } from '@staff-portal/graphql'
import { lazy } from '@staff-portal/utils'

const BlackFlagModalContent = lazy(() => import('./components/BlackFlagModalContent'))

interface Props {
  clientId: string
  companyName: string
  hideModal: () => void
}

const BlackFlagModal = ({ clientId, companyName, hideModal }: Props) => {
  return (
    <Modal
      onClose={hideModal}
      open
      size='small'
      data-testid='black-flag-modal'
      operationVariables={{
        nodeId: clientId,
        nodeType: NodeType.CLIENT,
        operationName: 'blackFlagClient'
      }}
      defaultTitle='Black Flag Company'
    >
      <BlackFlagModalContent
        clientId={clientId}
        clientName={companyName}
        hideModal={hideModal}
      />
    </Modal>
  )
}

export default BlackFlagModal
