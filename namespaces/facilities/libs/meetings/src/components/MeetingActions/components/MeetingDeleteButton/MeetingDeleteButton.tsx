import { useModal } from '@staff-portal/modals-service'
import { Operation, OperationType } from '@staff-portal/operations'
import { Button } from '@toptal/picasso'
import React from 'react'

import MeetingDeleteModal from '../MeetingDeleteModal'

export interface Props {
  meetingId: string
  attendeeName?: string | null
  operation: OperationType
}

const MeetingDeleteButton = ({ meetingId, attendeeName, operation }: Props) => {
  const { showModal } = useModal(MeetingDeleteModal, {
    meetingId,
    attendeeName
  })

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <Button
          size='small'
          variant='negative'
          onClick={showModal}
          disabled={disabled}
          data-testid='meeting-delete-button'
        >
          Delete
        </Button>
      )}
    />
  )
}

export default MeetingDeleteButton
