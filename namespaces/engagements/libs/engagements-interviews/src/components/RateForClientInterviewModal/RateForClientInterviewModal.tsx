import { NodeType } from '@staff-portal/graphql'
import { Modal } from '@staff-portal/modals-service'
import { lazy } from '@staff-portal/utils'
import React from 'react'

const RateForClientInterviewModalContent = lazy(
  () =>
    import(
      '../RateForClientInterviewModalContent/RateForClientInterviewModalContent'
    )
)

type Props = {
  interviewId: string
  engagementId: string
  hideModal: () => void
}

const RateForClientInterviewModal = ({
  interviewId,
  engagementId,
  hideModal
}: Props) => (
  <Modal
    open
    size='small'
    operationVariables={{
      nodeId: interviewId,
      nodeType: NodeType.INTERVIEW,
      operationName: 'rateForClientInterview'
    }}
    onClose={hideModal}
    data-testid='accept-candidate-modal'
  >
    <RateForClientInterviewModalContent
      engagementId={engagementId}
      interviewId={interviewId}
      hideModal={hideModal}
    />
  </Modal>
)

export default RateForClientInterviewModal
