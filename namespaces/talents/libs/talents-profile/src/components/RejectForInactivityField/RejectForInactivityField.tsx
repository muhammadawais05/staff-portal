import React from 'react'
import { Typography } from '@toptal/picasso'

import { Deadline } from './types'
import EditableActivationDeadline from './containers/EditableActivationDeadline/EditableActivationDeadline'
import EditableRejectionDeadline from './containers/EditableRejectionDeadline/EditableRejectionDeadline'
import { ActivationTypes } from './config'

export const DEFAULT_MESSAGE = 'No rejection date scheduled.'

interface Props {
  talentId: string
  timeZone?: string
  deadline?: Deadline
}

const RejectForInactivityField = ({ deadline, talentId, timeZone }: Props) => {
  if (!deadline) {
    return (
      <Typography weight='semibold' size='medium'>
        {DEFAULT_MESSAGE}
      </Typography>
    )
  }

  if (deadline.type === ActivationTypes.ACTIVATION) {
    return (
      <EditableActivationDeadline
        deadline={deadline}
        talentId={talentId}
        timeZone={timeZone}
      />
    )
  }

  return <EditableRejectionDeadline deadline={deadline} talentId={talentId} />
}

export default RejectForInactivityField
