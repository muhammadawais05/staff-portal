import { ModalActionItem } from '@staff-portal/modals-service'
import { OperationType } from '@staff-portal/operations'
import { ActionItemProps } from '@staff-portal/ui'
import React, { ReactNode } from 'react'

import { EngagementRescheduleInterviewFragment } from '../../data'
import {
  extractRescheduleInterviewOperation,
  getEngagementInterview
} from '../../utils'
import { RescheduleInterviewModal } from '../RescheduleInterviewModal'

export type Props = ActionItemProps & {
  interviewId?: string
  children?: ReactNode
  operation?: OperationType
  latestExternalInterview?: EngagementRescheduleInterviewFragment | null
  newExternalInterview?: EngagementRescheduleInterviewFragment | null
}

const RescheduleInterviewItem = ({
  interviewId,
  operation: initialOperation,
  latestExternalInterview,
  newExternalInterview,
  children = 'Reschedule',
  'data-testid': dataTestId = 'reschedule-interview-item',
  ...props
}: Props) => {
  const interview = getEngagementInterview({
    latestInterview: latestExternalInterview,
    newInterview: newExternalInterview
  })

  const selectedInterviewId = interviewId ?? interview?.id

  if (!selectedInterviewId) {
    return null
  }

  const rescheduleInterviewOperation = extractRescheduleInterviewOperation({
    latestExternalInterview,
    newExternalInterview
  })

  const operation = initialOperation ?? rescheduleInterviewOperation

  return (
    <ModalActionItem
      {...props}
      modal={RescheduleInterviewModal}
      modalProps={{ interviewId: selectedInterviewId }}
      operation={operation}
      data-testid={dataTestId}
    >
      {children}
    </ModalActionItem>
  )
}

export default RescheduleInterviewItem
