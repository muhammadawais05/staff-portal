import { formatAmount } from '@toptal/picasso/utils'
import React from 'react'
import { NO_VALUE } from '@staff-portal/config'

export const HOUR_SUFFIX = '/hour'

type Props = {
  hourlyRate?: string | null | number
  shortSuffix?: boolean
}

const HourlyRateField = ({ hourlyRate, shortSuffix }: Props) => {
  return hourlyRate ? (
    <>
      {`${formatAmount({
        amount: hourlyRate
      })}${shortSuffix ? '/h' : HOUR_SUFFIX}`}
    </>
  ) : (
    <>{NO_VALUE}</>
  )
}

export default HourlyRateField
