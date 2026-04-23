import React from 'react'
import { Modal } from '@staff-portal/modals-service'
import { NodeType } from '@staff-portal/graphql'
import { lazy } from '@staff-portal/utils'

type Props = {
  clientId: string
  hideModal: () => void
  onSuccess?: () => void
}

const ClientApproveModalContent = lazy(
  () =>
    import('./components/ClientApproveModalContent/ClientApproveModalContent')
)

const ClientApproveModal = ({ hideModal, onSuccess, clientId }: Props) => (
  <Modal
    open
    onClose={hideModal}
    defaultTitle='Approve Applicant Company'
    data-testid='client-approve-modal'
    size='small'
    operationVariables={{
      nodeId: clientId,
      nodeType: NodeType.CLIENT,
      operationName: 'approveClient'
    }}
  >
    <ClientApproveModalContent
      clientId={clientId}
      onSuccess={onSuccess}
      hideModal={hideModal}
    />
  </Modal>
)

export default ClientApproveModal
