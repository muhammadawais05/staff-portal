import { Modal } from '@staff-portal/modals-service'
import React from 'react'
import { NodeType } from '@staff-portal/graphql'
import { lazy } from '@staff-portal/utils'

const AcceptCandidateModalForm = lazy(
  () => import('./components/AcceptCandidateModalForm/AcceptCandidateModalForm')
)

type Props = {
  engagementId: string
  hideModal: () => void
}

const AcceptCandidateModal = ({ engagementId, hideModal }: Props) => (
  <Modal
    open
    size='small'
    operationVariables={{
      nodeId: engagementId,
      nodeType: NodeType.ENGAGEMENT,
      operationName: 'scheduleEngagementActivationStartDate'
    }}
    onClose={hideModal}
    data-testid='accept-candidate-modal'
  >
    <AcceptCandidateModalForm
      engagementId={engagementId}
      hideModal={hideModal}
    />
  </Modal>
)

export default AcceptCandidateModal
