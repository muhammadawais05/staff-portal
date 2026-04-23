import React from 'react'
import { ModalActionItem } from '@staff-portal/modals-service'
import { OperationFragment } from '@staff-portal/operations'

import TrialLengthEditModal from '../TrialLengthEditModal'

type Props = {
  engagementId: string
  operation: OperationFragment
}

const TrialLengthEditButton = ({ engagementId, operation }: Props) => (
  <ModalActionItem
    modal={TrialLengthEditModal}
    modalProps={{ engagementId }}
    operation={operation}
    componentType='button'
    size='small'
    variant='secondary'
    data-testid='TrialLengthEdit-button'
  >
    Edit
  </ModalActionItem>
)

export default TrialLengthEditButton
