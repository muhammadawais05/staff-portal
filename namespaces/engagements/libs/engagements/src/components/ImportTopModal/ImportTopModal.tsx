import React from 'react'
import { Modal } from '@staff-portal/modals-service'
import { NodeType } from '@staff-portal/graphql'
import { lazy } from '@staff-portal/utils'

export type Props = {
  engagementId: string
  hideModal: () => void
}

const ImportTopModalContent = lazy(
  () => import('./components/ImportTopModalContent/ImportTopModalContent')
)

const ImportTopModal = ({ engagementId, hideModal }: Props) => (
  <Modal
    open
    onClose={hideModal}
    size='small'
    operationVariables={{
      nodeId: engagementId,
      nodeType: NodeType.ENGAGEMENT,
      operationName: 'importTop'
    }}
    defaultTitle='Import TOP'
    data-testid='import-top-modal'
  >
    <ImportTopModalContent engagementId={engagementId} hideModal={hideModal} />
  </Modal>
)

export default ImportTopModal
