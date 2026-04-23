import { Typography } from '@toptal/picasso'
import React from 'react'
import { NO_VALUE } from '@staff-portal/config'
import { useUserDateTimeFormatter } from '@staff-portal/current-user'

export interface Props {
  createdAt: string
  finishedAt?: string
}

const OnlineTestAttemptTooltipContent = ({ createdAt, finishedAt }: Props) => {
  const userDateTimeFormatter = useUserDateTimeFormatter()

  const finishedAtText = finishedAt
    ? userDateTimeFormatter(finishedAt)
    : NO_VALUE

  return (
    <>
      <Typography>Sent on: {userDateTimeFormatter(createdAt)}</Typography>
      <Typography>Finished on: {finishedAtText}</Typography>
    </>
  )
}

export default OnlineTestAttemptTooltipContent
