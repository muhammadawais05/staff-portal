import React from 'react'
import { Typography } from '@toptal/picasso'
import { useUserDateTimeFormatter } from '@staff-portal/current-user'

export interface Props {
  requestedStartTime: string
  timeZoneName?: string
}

const FormattedTimeText = ({ requestedStartTime, timeZoneName }: Props) => {
  const formatDateTime = useUserDateTimeFormatter()

  return (
    <Typography as='span' weight='semibold' size='medium'>
      {`${formatDateTime(requestedStartTime)}${
        timeZoneName ? ` ${timeZoneName}.` : '.'
      }`}
    </Typography>
  )
}

export default FormattedTimeText
