import React from 'react'
import { Typography } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import { getUnfilledCallsPath } from '@staff-portal/routes'
import { StatusMessageNotification } from '@staff-portal/ui'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { REFRESH_CALLS_LIST } from '@staff-portal/communication'

import { useGetUnfilledCallsCount } from './data'

const UnfilledCallsStatusMessage = () => {
  const { data: unfilledCallsCount, refetch } = useGetUnfilledCallsCount()

  useMessageListener([REFRESH_CALLS_LIST], () => refetch?.())

  if (!unfilledCallsCount) {
    return null
  }

  return (
    <StatusMessageNotification variant='yellow'>
      <Typography
        color='black'
        data-testid='status-message-unfilled-calls-message'
      >
        You have
        <Link href={getUnfilledCallsPath()}>
          {` ${unfilledCallsCount} `}recent calls with missing information
        </Link>
        .
      </Typography>
    </StatusMessageNotification>
  )
}

export default UnfilledCallsStatusMessage
