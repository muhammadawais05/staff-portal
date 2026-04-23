import { useModal } from '@staff-portal/modals-service'
import { Operation, OperationType } from '@staff-portal/operations'
import { RejectSpecializationApplicationModal } from '@staff-portal/talents'
import { Button } from '@toptal/picasso'
import React from 'react'

export interface Props {
  talentId: string
  specializationApplicationId: string
  operation: OperationType
}

const RejectSpecializationApplicationButton = ({
  talentId,
  specializationApplicationId,
  operation
}: Props) => {
  const { showModal } = useModal(RejectSpecializationApplicationModal, {
    talentId,
    specializationApplicationId
  })

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <Button
          disabled={disabled}
          size='small'
          variant='negative'
          onClick={showModal}
          data-testid='reject-specialization-application-button'
        >
          Reject
        </Button>
      )}
    />
  )
}

export default RejectSpecializationApplicationButton
