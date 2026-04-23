import React from 'react'
import { Button } from '@toptal/picasso'
import { Operation, OperationType } from '@staff-portal/operations'
import { useModal } from '@staff-portal/modals-service'

import ConvertSpecializationApplicationModal from '../ConvertSpecializationApplicationModal'

export interface Props {
  talentId: string
  specializationTitle: string
  specializationApplicationId: string
  specializationId: string
  operation: OperationType
}

const ConvertSpecializationApplicationButton = ({
  talentId,
  specializationTitle,
  specializationApplicationId,
  specializationId,
  operation
}: Props) => {
  const { showModal } = useModal(ConvertSpecializationApplicationModal, {
    talentId,
    specializationTitle,
    specializationApplicationId,
    specializationId
  })

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <Button
          size='small'
          variant='secondary'
          disabled={disabled}
          onClick={showModal}
          data-testid='convert-specialization-application-button'
        >
          Convert
        </Button>
      )}
    />
  )
}

export default ConvertSpecializationApplicationButton
