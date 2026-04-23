import React from 'react'
import { Modal } from '@staff-portal/modals-service'
import { NodeType } from '@staff-portal/graphql'
import { lazy } from '@staff-portal/utils'

export type Props = {
  engagementId: string
  hideModal: () => void
}

const ChangeEngagementStartDateModalContent = lazy(
  () =>
    import(
      './components/ChangeEngagementStartDateModalContent/ChangeEngagementStartDateModalContent'
    )
)

const ChangeEngagementStartDateModal = ({ engagementId, hideModal }: Props) => (
  <Modal
    open
    onClose={hideModal}
    size='small'
    data-testid='ChangeEngagementStartDateModal'
    operationVariables={{
      nodeId: engagementId,
      nodeType: NodeType.ENGAGEMENT,
      operationName: 'changeEngagementStartDate'
    }}
    defaultTitle='Change Start Date'
  >
    <ChangeEngagementStartDateModalContent
      engagementId={engagementId}
      hideModal={hideModal}
    />
  </Modal>
)

export default ChangeEngagementStartDateModal
