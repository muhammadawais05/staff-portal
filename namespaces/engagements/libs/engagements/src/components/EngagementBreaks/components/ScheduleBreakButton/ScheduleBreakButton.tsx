import { Button } from '@toptal/picasso/Button'
import { Maybe } from '@toptal/picasso/utils'
import React from 'react'
import {
  Operation as OperationType,
  EngagementStatus
} from '@staff-portal/graphql/staff'
import { useModal } from '@staff-portal/modals-service'
import { Operation } from '@staff-portal/operations'

import { ScheduleType } from '../../../ScheduleBreakModal/types'
import ScheduleBreakModal from '../../../ScheduleBreakModal'

interface Props {
  operation?: OperationType
  engagementId: string
  scheduleType?: ScheduleType
  engagementBreakId?: string
  status: Maybe<EngagementStatus>
}

const ScheduleBreakButton = ({
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
        <Button
          size='small'
          variant='positive'
          onClick={showModal}
          disabled={disabled}
        >
          Schedule a Break
        </Button>
      )}
    />
  )
}

export default ScheduleBreakButton
