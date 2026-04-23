import { useCallback } from 'react'
import { parseAndFormatDate } from '@staff-portal/date-time-utils'

import { useUserTimeZone } from '../use-user-time-zone/use-user-time-zone'

export const useUserDateFormatter = () => {
  const timeZone = useUserTimeZone()

  const format = useCallback(
    <TOutputDate extends string = string>(
      date: string | null | undefined,
      dateFormat?: string
    ): TOutputDate => {
      const outputDate = date
        ? parseAndFormatDate(date, {
            dateFormat,
            timeZone
          })
        : ''

      return outputDate as TOutputDate
    },
    [timeZone]
  )

  return format
}
