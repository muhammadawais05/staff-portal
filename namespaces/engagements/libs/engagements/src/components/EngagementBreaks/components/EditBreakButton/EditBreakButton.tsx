import { Button } from '@toptal/picasso'
import { Maybe } from '@toptal/picasso/utils'
import React from 'react'
import {
  EngagementStatus,
  Operation as OperationType
} from '@staff-portal/graphql/staff'
import { useModal } from '@staff-portal/modals-service'
import { Operation } from '@staff-portal/operations'

import ScheduleBreakModal from '../../../ScheduleBreakModal'
import {
  BreakType,
  EngagementBreakInitialValues,
  ScheduleType
} from '../../../ScheduleBreakModal/types'

type Props = {
  engagementId: string
  operation: OperationType
  scheduleType?: ScheduleType
  engagementBreakId: string
  engagementStatus: Maybe<EngagementStatus>
  initialValues: EngagementBreakInitialValues
}

const EditBreakButton = ({
  engagementId,
  engagementBreakId,
  scheduleType = ScheduleType.EDIT,
  engagementStatus,
  operation,
  initialValues
}: Props) => {
  const breakType =
    initialValues.startDate === initialValues.endDate
      ? BreakType.SINGLE
      : BreakType.MULTI

  const { showModal } = useModal(ScheduleBreakModal, {
    engagementId,
    scheduleType,
    engagementBreakId,
    status: engagementStatus,
    initialValues,
    breakType
  })

  return (
    <Operation
      inline={false}
      operation={operation}
      render={disabled => (
        <Button
          size='small'
          variant='secondary'
          disabled={disabled}
          onClick={showModal}
          data-testid='EditBreakButton-button'
        >
          Edit
        </Button>
      )}
    />
  )
}

export default EditBreakButton
