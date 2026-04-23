import React from 'react'
import { Modal } from '@staff-portal/modals-service'
import { EngagementStatus } from '@staff-portal/graphql/staff'
import { Maybe } from '@toptal/picasso/utils'
import { NodeType } from '@staff-portal/graphql'

import { SCHEDULE_ENGAGEMENT_BREAK_MAPPING } from './constants'
import { ScheduleBreakModalContent } from '../ScheduleBreakModalContent'
import { BreakType, ScheduleType, EngagementBreakInitialValues } from './types'

type Props = {
  engagementId: string
  scheduleType: ScheduleType
  breakType?: BreakType
  status: Maybe<EngagementStatus>
  engagementBreakId?: string
  initialValues?: EngagementBreakInitialValues
  hideModal: () => void
}

const ScheduleBreakModal = ({
  engagementId,
  scheduleType,
  engagementBreakId,
  initialValues,
  status,
  breakType,
  hideModal
}: Props) => {
  const { modalTitle } = SCHEDULE_ENGAGEMENT_BREAK_MAPPING[scheduleType]

  return (
    <Modal
      open
      onClose={hideModal}
      size='small'
      data-testid='schedule-break-modal'
      operationVariables={{
        nodeId: engagementId,
        nodeType: NodeType.ENGAGEMENT,
        operationName: 'scheduleEngagementBreak'
      }}
      defaultTitle={modalTitle}
    >
      <Modal.Title>{modalTitle}</Modal.Title>
      <ScheduleBreakModalContent
        engagementId={engagementId}
        scheduleType={scheduleType}
        engagementBreakId={engagementBreakId}
        initialValues={initialValues}
        status={status}
        breakType={breakType}
        onClose={hideModal}
      />
    </Modal>
  )
}

export default ScheduleBreakModal
