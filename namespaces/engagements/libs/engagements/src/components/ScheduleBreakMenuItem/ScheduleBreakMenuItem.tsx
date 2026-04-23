import React from 'react'
import { Menu } from '@toptal/picasso'
import { Maybe } from '@toptal/picasso/utils'
import { useModal } from '@staff-portal/modals-service'
import {
  Operation as OperationType,
  EngagementStatus
} from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'

import { ScheduleType } from '../ScheduleBreakModal/types'
import ScheduleBreakModal from '../ScheduleBreakModal'

type Props = {
  engagementId: string
  operation: OperationType
  scheduleType?: ScheduleType
  engagementBreakId?: string
  status?: Maybe<EngagementStatus>
}

const ScheduleBreakMenuItem = ({
  engagementId,
  operation,
  scheduleType = ScheduleType.CREATE,
  engagementBreakId,
  status
}: Props) => {
  const { showModal } = useModal(ScheduleBreakModal, {
    engagementId,
    scheduleType,
    engagementBreakId,
    status
  })

  return (
    <Operation
      inline={false}
      operation={operation}
      render={disabled => (
        <Menu.Item
          data-testid='schedule-break'
          onClick={showModal}
          disabled={disabled}
        >
          Schedule Break
        </Menu.Item>
      )}
    />
  )
}

export default ScheduleBreakMenuItem
