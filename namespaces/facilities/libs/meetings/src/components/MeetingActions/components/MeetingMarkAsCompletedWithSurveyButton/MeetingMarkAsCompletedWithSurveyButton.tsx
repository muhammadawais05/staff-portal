import React from 'react'
import { Button } from '@toptal/picasso'
import { Operation, OperationType } from '@staff-portal/operations'
import { useModal } from '@staff-portal/modals-service'

import MeetingMarkAsCompletedWithSurveyConfirmationModal from '../MeetingMarkAsCompletedWithSurveyConfirmationModal'

export interface Props {
  meetingId: string
  muted: boolean
  operation: OperationType
}

const MeetingMarkAsCompletedWithSurveyButton = ({
  meetingId,
  muted,
  operation
}: Props) => {
  const { showModal } = useModal(
    MeetingMarkAsCompletedWithSurveyConfirmationModal,
    { meetingId }
  )

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <Button
          size='small'
          variant={muted ? 'secondary' : 'positive'}
          titleCase={false}
          onClick={showModal}
          disabled={disabled}
        >
          Mark as Completed
        </Button>
      )}
    />
  )
}

export default MeetingMarkAsCompletedWithSurveyButton
