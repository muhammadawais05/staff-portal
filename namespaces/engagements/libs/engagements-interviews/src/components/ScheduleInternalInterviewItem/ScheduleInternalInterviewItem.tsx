import { useModal } from '@staff-portal/modals-service'
import { Operation } from '@staff-portal/operations'
import { ActionItemProps } from '@staff-portal/ui'
import { Button, Menu } from '@toptal/picasso'
import React from 'react'

import { EngagementScheduleInternalInterviewFragment } from '../../data'
import { extractScheduleInternalInterviewOperation } from '../../utils'
import { ScheduleInternalInterviewModal } from '../ScheduleInternalInterviewModal'

export type Props = ActionItemProps & {
  engagementId: string
  latestInternalInterview?: EngagementScheduleInternalInterviewFragment | null
  newInternalInterview?: EngagementScheduleInternalInterviewFragment | null
}

const ScheduleInternalInterviewItem = ({
  componentType = 'button',
  engagementId,
  latestInternalInterview,
  newInternalInterview,
  ...props
}: Props) => {
  const { showModal } = useModal(ScheduleInternalInterviewModal, {
    engagementId
  })

  const operation = extractScheduleInternalInterviewOperation({
    latestInternalInterview,
    newInternalInterview
  })

  const Component = componentType === 'menu-item' ? Menu.Item : Button

  return (
    <Operation
      inline={false}
      operation={operation}
      render={disabled => (
        <Component
          disabled={disabled}
          data-testid='schedule-internal-interview'
          onClick={showModal}
          {...props}
        >
          Schedule Internal Interview
        </Component>
      )}
    />
  )
}

export default ScheduleInternalInterviewItem
