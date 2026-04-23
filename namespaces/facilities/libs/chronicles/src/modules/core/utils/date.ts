import {
  addDays,
  isSameWeek,
  isSameDay,
  isSameMonth,
  format,
  parseISO,
  formatISO,
  utcToZonedTime
} from '@staff-portal/date-time-utils'
import ramdaIs from 'ramda/src/is'

type DateType = Date | number

const DAYS_A_WEEK = 7

// Simple date format validation - YYYY-MM-DD
const DATE_REGEX =
  /^(19|20)\d\d[-/.](0[1-9]|1[012])[-/.](0[1-9]|[12][0-9]|3[01])$/

// Simple time format validation - HH:mm:ss
const TIME_REGEX = /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/

const TIMEZONE_REGEX = /[+-]\d{2}:\d{2}/ // ex. +08:00, -01:00, +00:00

const DEFAULT_DATE_FORMAT = `MMM d, yyyy`
const DEFAULT_TIME_FORMAT = `h:mmaaaaa'm'`
const DEFAULT_FULL_DATE_FORMAT = `${DEFAULT_DATE_FORMAT} 'at' ${DEFAULT_TIME_FORMAT}`

const isToday = (date: DateType, currentDate = new Date()) =>
  isSameDay(date, currentDate)

const isThisWeek = (date: DateType, currentDate = new Date()) =>
  isSameWeek(date, currentDate)

const isLastWeek = (date: DateType, currentDate = new Date()) =>
  isSameWeek(addDays(date, DAYS_A_WEEK), currentDate)

const isThisMonth = (date: DateType, currentDate = new Date()) =>
  isSameMonth(date, currentDate)

const displayDate = (date: DateType, dateFormat: string, timezone?: string) =>
  timezone
    ? format(utcToZonedTime(date, timezone), dateFormat)
    : format(date, dateFormat)

const isDateValid = (date: any): date is string =>
  ramdaIs(String, date) && Boolean(date.match(DATE_REGEX))

const isTimeValid = (time: any): time is string =>
  ramdaIs(String, time) && Boolean(time.match(TIME_REGEX))

const toDate = (date: string) => parseISO(date)

const toUTCDate = (dateString: string) => {
  const date = toDate(dateString)

  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  )
}

const getDateWithoutTimezone = (dateString: string) => {
  const timeZone = dateString.match(TIMEZONE_REGEX)

  if (!timeZone || !timeZone[0]) {
    return parseISO(dateString)
  }

  return parseISO(dateString.replace(timeZone[0], ''))
}

const toDateWithTime = (timeString: string) => {
  if (!isTimeValid(timeString)) {
    throw new Error('Invalid time format')
  }

  const date = new Date()
  const dateString = formatISO(date, { representation: 'date' })

  return toDate(`${dateString}T${timeString}`)
}

export {
  DEFAULT_DATE_FORMAT,
  DEFAULT_TIME_FORMAT,
  DEFAULT_FULL_DATE_FORMAT,
  isToday,
  isThisWeek,
  isLastWeek,
  isThisMonth,
  displayDate,
  isDateValid,
  isTimeValid,
  toDate,
  getDateWithoutTimezone,
  toUTCDate,
  toDateWithTime
}
