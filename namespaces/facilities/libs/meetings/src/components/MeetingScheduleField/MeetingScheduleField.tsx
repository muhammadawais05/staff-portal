import React from 'react'
import { Tooltip, Typography } from '@toptal/picasso'
import {
  DEFAULT_TIME_FORMAT,
  parseAndFormatDateUTC,
  getDuration,
  addMinutes,
  parseISO
} from '@staff-portal/date-time-utils'
import { useUserDateTimeFormatter } from '@staff-portal/current-user'

import { MeetingFragment } from '../../data/meeting-fragment'

export type Props = Pick<MeetingFragment, 'scheduledAt' | 'durationMinutes'>

const MeetingScheduleField = ({ scheduledAt, durationMinutes }: Props) => {
  const formatDateTime = useUserDateTimeFormatter()

  const scheduledEndAt = addMinutes(
    parseISO(scheduledAt),
    durationMinutes
  ).toISOString()

  return (
    <Tooltip
      placement='top'
      content={`UTC: ${parseAndFormatDateUTC(
        scheduledAt
      )} — ${parseAndFormatDateUTC(scheduledEndAt, DEFAULT_TIME_FORMAT)}`}
    >
      <Typography size='medium' weight='semibold' inline>
        {`${formatDateTime(scheduledAt)} — ${formatDateTime(
          scheduledEndAt,
          DEFAULT_TIME_FORMAT
        )} (${getDuration(durationMinutes)})`}
      </Typography>
    </Tooltip>
  )
}

export default MeetingScheduleField
