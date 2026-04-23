import React, { FC, ReactText, memo } from 'react'
import pluralize from 'pluralize'
import { getHoursMinutes } from '@staff-portal/billing/src/_lib/dateTime'
import i18n from '@staff-portal/billing/src/utils/i18n'

import { timesheetInputEmptyValue } from '../../../../utils/timesheet'

const displayName = 'Duration'

interface Props {
  hours?: ReactText
  minutes: ReactText
  isSizeAdjust?: boolean
}

const partialDuration = (value: ReactText, unit: ReactText) => {
  const transformedValue = Number(value)

  return (
    <strong>
      {transformedValue}{' '}
      {pluralize(i18n.t(`common:unit.${unit}`), transformedValue)}
    </strong>
  )
}

export const Duration: FC<Props> = memo(({ hours, minutes }) => {
  let adjustedMinutes: ReactText = minutes
  let adjustedHours: ReactText | undefined = hours

  if (!adjustedHours) {
    const adjustedValue = getHoursMinutes({ minutes: Number(minutes) })

    adjustedHours = adjustedValue.hours
    adjustedMinutes = adjustedValue.minutes
  }

  const isMinuteEmpty =
    !adjustedMinutes ||
    adjustedMinutes === '0' ||
    adjustedMinutes === timesheetInputEmptyValue

  return (
    <>
      {partialDuration(adjustedHours, 'hr')}{' '}
      {!isMinuteEmpty && partialDuration(adjustedMinutes, 'min')}
    </>
  )
})

Duration.displayName = displayName

export default Duration
