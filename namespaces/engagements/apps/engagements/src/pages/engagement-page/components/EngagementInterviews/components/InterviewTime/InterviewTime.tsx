import { Tooltip, Typography } from '@toptal/picasso'
import React from 'react'
import {
  DEFAULT_FULL_DATE_FORMAT,
  DEFAULT_FULL_DATE_FORMAT_WITH_TIMEZONE,
  parseAndFormatDateTime,
  TimeZoneFragment
} from '@staff-portal/date-time-utils'
import { useUserDateTimeFormatter } from '@staff-portal/current-user'

export interface Props {
  interviewTime: string
  timeZone: TimeZoneFragment
}

const InterviewTime = ({ interviewTime, timeZone }: Props) => {
  const formatDateTime = useUserDateTimeFormatter()

  const tooltipContent = `${parseAndFormatDateTime(interviewTime, {
    timeZone: timeZone.value,
    dateFormat: `eeee ${DEFAULT_FULL_DATE_FORMAT}`
  })} ${timeZone.name}`

  return (
    <Tooltip content={tooltipContent}>
      <Typography inline color='inherit' size='inherit'>
        {formatDateTime(interviewTime, DEFAULT_FULL_DATE_FORMAT_WITH_TIMEZONE)}
      </Typography>
    </Tooltip>
  )
}

export default InterviewTime
