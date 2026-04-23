import { useModal } from '@staff-portal/modals-service'
import { Operation } from '@staff-portal/operations'
import { ActionItemProps } from '@staff-portal/ui'
import { Button, Menu } from '@toptal/picasso'
import React, { ReactNode } from 'react'

import { EngagementScheduleInterviewFragment } from '../../data'
import { extractScheduleInterviewOperation } from '../../utils'
import { ScheduleInterviewModal } from '../ScheduleInterviewModal'

export type Props = ActionItemProps & {
  engagementId: string
  additionalInterview?: boolean
  latestExternalInterview?: EngagementScheduleInterviewFragment | null
  newExternalInterview?: EngagementScheduleInterviewFragment | null
  children?: ReactNode
}

const ScheduleInterviewItem = ({
  componentType,
  engagementId,
  additionalInterview,
  latestExternalInterview,
  newExternalInterview,
  children = 'Schedule Interview',
  ...props
}: Props) => {
  const { showModal } = useModal(ScheduleInterviewModal, {
    engagementId,
    additionalInterview
  })

  const operation = extractScheduleInterviewOperation({
    additionalInterview,
    latestExternalInterview,
    newExternalInterview
  })

  const Component = componentType === 'menu-item' ? Menu.Item : Button

  return (
    <Operation
      inline={false}
      operation={operation}
      render={disabled => (
        <Component
          disabled={disabled}
          data-testid='schedule-interview-item'
          onClick={showModal}
          {...props}
        >
          {children}
        </Component>
      )}
    />
  )
}

export default ScheduleInterviewItem
