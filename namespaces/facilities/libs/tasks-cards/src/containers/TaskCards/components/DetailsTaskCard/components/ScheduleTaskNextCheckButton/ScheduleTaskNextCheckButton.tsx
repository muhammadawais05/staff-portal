import { useModal } from '@staff-portal/modals-service'
import { Operation, OperationType } from '@staff-portal/operations'
import { Button } from '@toptal/picasso'
import React from 'react'

import ScheduleNextCheckModal from '../ScheduleTaskNextCheckModal'

export interface Props {
  taskId: string
  operation: OperationType
  onScheduleTaskNextCheck: () => void
}

const ScheduleTaskNextCheckButton = ({
  taskId,
  onScheduleTaskNextCheck,
  operation
}: Props) => {
  const { showModal } = useModal(ScheduleNextCheckModal, {
    taskId,
    onScheduleTaskNextCheck
  })

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <Button
          size='small'
          variant='primary'
          data-testid='schedule-task-next-check-button'
          disabled={disabled}
          onClick={showModal}
        >
          Schedule Next Check
        </Button>
      )}
    />
  )
}

export default ScheduleTaskNextCheckButton
