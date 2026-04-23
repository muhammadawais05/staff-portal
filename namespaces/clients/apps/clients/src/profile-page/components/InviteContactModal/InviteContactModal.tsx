import React from 'react'
import { Modal } from '@staff-portal/modals-service'
import { NodeType } from '@staff-portal/graphql'
import { lazy } from '@staff-portal/utils'

const InviteContactContent = lazy(
  () => import('./components/InviteContactContent/InviteContactContent')
)

interface Props {
  clientId: string
  hideModal: () => void
}

const InviteContactModal = ({ clientId, hideModal }: Props) => (
  <Modal
    open
    onClose={hideModal}
    size='small'
    operationVariables={{
      nodeId: clientId,
      nodeType: NodeType.CLIENT,
      operationName: 'inviteCompanyRepresentative'
    }}
  >
    <InviteContactContent clientId={clientId} hideModal={hideModal} />
  </Modal>
)

export default InviteContactModal
