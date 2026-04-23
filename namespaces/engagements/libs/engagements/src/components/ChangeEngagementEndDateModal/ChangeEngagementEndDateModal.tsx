import React from 'react'
import { Modal } from '@staff-portal/modals-service'
import { NodeType } from '@staff-portal/graphql'
import { lazy } from '@staff-portal/utils'

type Props = {
  engagementId: string
  hideModal: () => void
}

const ChangeEngagementEndDateModalContent = lazy(
  () =>
    import(
      './components/ChangeEngagementEndDateModalContent/ChangeEngagementEndDateModalContent'
    )
)

const ChangeEngagementEndDateModal = ({ engagementId, hideModal }: Props) => (
  <Modal
    open
    onClose={hideModal}
    size='small'
    data-testid='ChangeEngagementEndDateModal'
    operationVariables={{
      nodeId: engagementId,
      nodeType: NodeType.ENGAGEMENT,
      operationName: 'changeEngagementEndDate'
    }}
    defaultTitle='Change End Date'
  >
    <ChangeEngagementEndDateModalContent
      engagementId={engagementId}
      hideModal={hideModal}
    />
  </Modal>
)

export default ChangeEngagementEndDateModal
