import { useModal } from '@staff-portal/modals-service'
import { Operation, OperationType } from '@staff-portal/operations'
import { useActionLoading } from '@staff-portal/utils'
import { Button } from '@toptal/picasso'
import React from 'react'

import MeetingCancelModal from '../MeetingCancelModal'

export type Props = {
  meetingId: string
  operation: OperationType
}

const MeetingCancelButton = ({ meetingId, operation }: Props) => {
  const { actionsLoading } = useActionLoading(`meeting-${meetingId}`)
  const { showModal } = useModal(MeetingCancelModal, { meetingId })

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <Button
          data-testid='MeetingCancelButton'
          size='small'
          variant='negative'
          onClick={showModal}
          disabled={actionsLoading || disabled}
        >
          Cancel
        </Button>
      )}
    />
  )
}

export default MeetingCancelButton
