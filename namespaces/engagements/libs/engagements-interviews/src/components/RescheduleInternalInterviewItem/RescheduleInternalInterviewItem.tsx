import { useModal } from '@staff-portal/modals-service'
import { Operation } from '@staff-portal/operations'
import { ActionItemProps } from '@staff-portal/ui'
import { Button, Menu } from '@toptal/picasso'
import React from 'react'

import { EngagementRescheduleInternalInterviewFragment } from '../../data'
import {
  extractRescheduleInternalInterviewOperation,
  getEngagementInterview
} from '../../utils'
import { RescheduleInternalInterviewModal } from '../RescheduleInternalInterviewModal'

export type Props = ActionItemProps & {
  latestInternalInterview?: EngagementRescheduleInternalInterviewFragment | null
  newInternalInterview?: EngagementRescheduleInternalInterviewFragment | null
}

const RescheduleInternalInterviewItem = ({
  componentType = 'button',
  latestInternalInterview,
  newInternalInterview,
  ...props
}: Props) => {
  const interview = getEngagementInterview({
    latestInterview: latestInternalInterview,
    newInterview: newInternalInterview
  })

  const operation = extractRescheduleInternalInterviewOperation({
    latestInternalInterview,
    newInternalInterview
  })

  const { showModal } = useModal(RescheduleInternalInterviewModal, {
    interviewId: interview?.id as string
  })

  if (!interview) {
    return null
  }

  const Component = componentType === 'menu-item' ? Menu.Item : Button

  return (
    <Operation
      inline={false}
      operation={operation}
      render={disabled => (
        <Component
          disabled={disabled}
          data-testid='reschedule-internal-interview'
          onClick={showModal}
          {...props}
        >
          Reschedule Internal Interview
        </Component>
      )}
    />
  )
}

export default RescheduleInternalInterviewItem
