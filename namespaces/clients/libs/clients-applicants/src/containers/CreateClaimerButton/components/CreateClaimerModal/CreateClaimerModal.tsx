import React from 'react'
import { Modal } from '@staff-portal/modals-service'
import { NodeType } from '@staff-portal/graphql'
import { lazy } from '@staff-portal/utils'

interface Props {
  clientId: string
  hideModal: () => void
}

const CreateClaimerModalContainer = lazy(
  () => import('../CreateClaimerModalContainer/CreateClaimerModalContainer')
)

const CreateClaimerModal = ({ clientId, hideModal }: Props) => (
  <Modal
    onClose={hideModal}
    open={true}
    size='medium'
    operationVariables={{
      nodeId: clientId,
      nodeType: NodeType.CLIENT,
      operationName: 'createClientClaimer'
    }}
  >
    <CreateClaimerModalContainer clientId={clientId} hideModal={hideModal} />
  </Modal>
)

export default CreateClaimerModal
