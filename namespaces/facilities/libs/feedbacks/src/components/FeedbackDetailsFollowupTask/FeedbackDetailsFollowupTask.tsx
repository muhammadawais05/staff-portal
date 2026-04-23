import React from 'react'
import { Typography, TypographyOverflow } from '@toptal/picasso'
import { useUserDateFormatter } from '@staff-portal/current-user'
import { getTaskStatusColor } from '@staff-portal/tasks'

import { FeedbackDetailsTaskFragment } from '../../data'

export interface Props {
  task: FeedbackDetailsTaskFragment
}

const FeedbackDetailsFollowupTask = ({
  task: { createdAt, status }
}: Props) => {
  const userDateFormatter = useUserDateFormatter()

  return (
    <TypographyOverflow
      as='div'
      size='medium'
      weight='inherit'
      data-testid='feedback-details-followup-task'
    >
      {userDateFormatter(createdAt)} —{' '}
      <Typography
        titleCase
        as='span'
        size='medium'
        weight='inherit'
        color={getTaskStatusColor(status)}
      >
        {status}
      </Typography>
    </TypographyOverflow>
  )
}

export default FeedbackDetailsFollowupTask
