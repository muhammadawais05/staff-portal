import { Maybe } from '@toptal/picasso/utils'
import React from 'react'
import { EngagementStatus } from '@staff-portal/graphql/staff'

import { EngagementBreakFragment } from '../../data/get-engagement-breaks'
import { EngagementBreakInitialValues } from '../../../ScheduleBreakModal/types'
import DeleteBreakButton from '../DeleteBreakButton'
import EditBreakButton from '../EditBreakButton'

type Props = {
  node: EngagementBreakFragment
  engagementStatus: Maybe<EngagementStatus>
  engagementId: string
}

const BreakActions = ({ node, engagementStatus, engagementId }: Props) => {
  const initialValues: EngagementBreakInitialValues = {
    startDate: node.startDate,
    endDate: node.endDate,
    messageToClient: node.messageToClient
  }

  return (
    <>
      <EditBreakButton
        engagementId={engagementId}
        operation={node.operations.rescheduleEngagementBreak}
        engagementBreakId={node.id}
        engagementStatus={engagementStatus}
        initialValues={initialValues}
      />

      <DeleteBreakButton
        engagementId={engagementId}
        engagementBreakId={node.id}
        operation={node.operations.removeEngagementBreak}
      />
    </>
  )
}

export default BreakActions
