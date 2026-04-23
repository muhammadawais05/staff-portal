import React from 'react'
import { Typography } from '@toptal/picasso'
import { formatAmount } from '@toptal/picasso/utils'

interface Props {
  hourlyRate?: string | null
}

const HourlyRate = ({ hourlyRate }: Props) => {
  const formattedHourlyRate = hourlyRate
    ? `${formatAmount({ amount: hourlyRate })}/h`
    : ''

  return (
    <Typography data-testid='hourly-rate' size='xsmall' weight='semibold'>
      {formattedHourlyRate}
    </Typography>
  )
}

export default HourlyRate
