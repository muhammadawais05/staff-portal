import React from 'react'
import { NodeType } from '@staff-portal/graphql'
import { lazy } from '@staff-portal/utils'
import { Modal } from '@staff-portal/modals-service'

const TrialLengthEditModalForm = lazy(
  () => import('./components/TrialLengthEditModalForm/TrialLengthEditModalForm')
)

export type Props = {
  engagementId: string
  hideModal: () => void
}

const TrialLengthEditModal = ({ engagementId, hideModal }: Props) => (
  <Modal
    open
    size='small'
    onClose={hideModal}
    data-testid='TrialLengthEdit-modal'
    operationVariables={{
      nodeId: engagementId,
      nodeType: NodeType.ENGAGEMENT,
      operationName: 'changeEngagementTrialLength'
    }}
  >
    <TrialLengthEditModalForm
      engagementId={engagementId}
      hideModal={hideModal}
    />
  </Modal>
)

export default TrialLengthEditModal
