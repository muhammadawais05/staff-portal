import React from 'react'
import { Button } from '@toptal/picasso'
import { Operation, OperationType } from '@staff-portal/operations'
import { useModal } from '@staff-portal/modals-service'

import SendTalentToSpecializationModal from '../SendTalentToSpecializationModal'

export interface Props {
  talentId: string
  talentName: string
  operation: OperationType
}

const SendTalentToSpecializationButton = ({
  talentId,
  talentName,
  operation
}: Props) => {
  const { showModal } = useModal(SendTalentToSpecializationModal, {
    talentId,
    talentName
  })

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <Button
          size='small'
          variant='positive'
          disabled={disabled}
          onClick={showModal}
          data-testid='send-talent-to-specialization-button'
        >
          Begin Specialization Application
        </Button>
      )}
    />
  )
}

export default SendTalentToSpecializationButton
