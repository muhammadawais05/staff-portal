import {
  parseAndFormatDateTime,
  parseAndFormatDate,
  toDate,
  add
} from '@staff-portal/date-time-utils'

export const getCommunityEventFullDate = (date: string, time: string) => {
  if (!date) {
    return null
  }

  if (!time) {
    return parseAndFormatDate(date)
  }

  const [hours = 0, minutes = 0, seconds = 0] = time.split(':') ?? ''

  const fullDate = add(toDate(date), {
    hours: Number(hours),
    minutes: Number(minutes),
    seconds: Number(seconds)
  })

  return parseAndFormatDateTime(fullDate.toISOString())
}
