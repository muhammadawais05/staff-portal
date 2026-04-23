import { Typography } from '@toptal/picasso'
import React from 'react'
import { isWithinDateInterval } from '@staff-portal/date-time-utils'
import { useUserDateFormatter } from '@staff-portal/current-user'

interface Props {
  cycles: {
    startDate: string
    endDate: string
  }[]
}

const CurrentBillingCycles = ({ cycles }: Props) => {
  const cycle = cycles.find(({ startDate, endDate }) =>
    isWithinDateInterval({ start: startDate, end: endDate })
  )
  const format = useUserDateFormatter()

  if (!cycle) {
    return null
  }

  return (
    <Typography size='medium' data-testid='CurrentBillingCycles'>
      {format(cycle.startDate)} - {format(cycle.endDate)}
    </Typography>
  )
}

export default CurrentBillingCycles
