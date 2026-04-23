import { parseAndFormatDateTime } from '@staff-portal/date-time-utils'

import { useUserTimeZone } from '../use-user-time-zone/use-user-time-zone'

export const useUserDateTimeFormatter = () => {
  const timeZone = useUserTimeZone()

  return (date: string | null | undefined, dateFormat?: string) => {
    if (!date) {
      return ''
    }

    return parseAndFormatDateTime(date, {
      dateFormat,
      timeZone: timeZone
    })
  }
}
