import React from 'react'
import { Modal } from '@staff-portal/modals-service'
import { NodeType } from '@staff-portal/graphql'
import { lazy } from '@staff-portal/utils'

interface Props {
  clientId: string
  hideModal: () => void
}

const ClaimClientEnterpriseModalContent = lazy(
  () =>
    import(
      './components/ClaimClientEnterpriseModalContent/ClaimClientEnterpriseModalContent'
    )
)

const ClaimClientEnterpriseModal = ({ clientId, hideModal }: Props) => {
  return (
    <Modal
      open
      onClose={hideModal}
      defaultTitle='Notice: Claiming Enterprise Lead'
      data-testid='ClaimClientEnterpriseModal'
      operationVariables={{
        nodeId: clientId,
        nodeType: NodeType.CLIENT,
        operationName: 'claimClientEnterprise'
      }}
    >
      <ClaimClientEnterpriseModalContent
        clientId={clientId}
        hideModal={hideModal}
      />
    </Modal>
  )
}

export default ClaimClientEnterpriseModal
