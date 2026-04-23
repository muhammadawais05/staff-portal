import React from 'react'
import { ModalActionItem } from '@staff-portal/modals-service'
import { OperationType } from '@staff-portal/operations'

import RevertEngagementTrialToActiveModal from '../RevertEngagementTrialToActiveModal'

interface Props {
  engagementId: string
  operation?: OperationType
}

const RevertEngagementTrialToActiveItem = ({
  engagementId,
  operation
}: Props) => (
  <ModalActionItem
    componentType='menu-item'
    modal={RevertEngagementTrialToActiveModal}
    modalProps={{ engagementId }}
    operation={operation}
    data-testid='revert-trial'
  >
    Revert to Trial
  </ModalActionItem>
)

export default RevertEngagementTrialToActiveItem
