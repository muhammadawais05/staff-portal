import { format, parse } from '@staff-portal/date-time-utils'

export const convertTime = (time: string) => {
  if (time === '24:00:00') {
    return '12:00 AM'
  }

  const timeDate = parse(time, 'HH:mm:ss', new Date())

  return format(timeDate, 'h:mm aa')
}
