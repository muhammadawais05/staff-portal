import React from 'react'
import { Button } from '@toptal/picasso'
import { Operation, OperationType } from '@staff-portal/operations'
import { useModal } from '@staff-portal/modals-service'

import AddTalentToRemoteConsultingModal from '../AddTalentToRemoteConsultingModal'

export interface Props {
  talentId: string
  operation: OperationType
}

const AddTalentToRemoteConsultingButton = ({ talentId, operation }: Props) => {
  const { showModal } = useModal(AddTalentToRemoteConsultingModal, { talentId })

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <Button
          size='small'
          variant='positive'
          disabled={disabled}
          onClick={showModal}
          data-testid='add-talent-to-remote-consulting-button'
        >
          Add to Remote Consulting
        </Button>
      )}
    />
  )
}

export default AddTalentToRemoteConsultingButton
