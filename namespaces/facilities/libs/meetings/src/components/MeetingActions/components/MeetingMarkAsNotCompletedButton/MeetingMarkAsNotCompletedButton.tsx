import React from 'react'
import { Button } from '@toptal/picasso'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'
import { useModal } from '@staff-portal/modals-service'

import MarkAsNotCompletedModal from '../MarkAsNotCompletedModal'

export interface Props {
  meetingId: string
  muted: boolean
  operation: OperationType
}

const MeetingMarkAsNotCompletedButton = ({
  meetingId,
  muted,
  operation
}: Props) => {
  const { showModal } = useModal(MarkAsNotCompletedModal, {
    meetingId
  })

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <Button
          data-testid='meeting-mark-as-not-completed-button'
          variant={muted ? 'secondary' : 'negative'}
          size='small'
          titleCase={false}
          onClick={showModal}
          disabled={disabled}
        >
          Mark as Not Completed
        </Button>
      )}
    />
  )
}

export default MeetingMarkAsNotCompletedButton
