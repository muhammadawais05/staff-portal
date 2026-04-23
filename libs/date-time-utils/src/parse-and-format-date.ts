import { format, parseISO } from 'date-fns'

import { DEFAULT_FULL_DATE_FORMAT } from './constants'
import formatDate from './format-date'

const parseAndFormatDate = (
  date: string | null | undefined,
  options: {
    dateFormat?: string
    timeZone?: string
  } = {}
) => {
  if (!date) {
    return ''
  }

  return formatDate(parseISO(date), options)
}

export const parseAndFormatDateTime = (
  date: string,
  options: {
    dateFormat?: string
    timeZone?: string
  } = {}
) => {
  const { dateFormat, timeZone } = options

  return parseAndFormatDate(date, {
    dateFormat: dateFormat || DEFAULT_FULL_DATE_FORMAT,
    timeZone
  })
}

const getUTCDate = (date: Date) =>
  new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  )

export const parseAndFormatDateUTC = (
  date: string,
  dateFormat: string = DEFAULT_FULL_DATE_FORMAT
) => format(getUTCDate(parseISO(date)), dateFormat)

export default parseAndFormatDate
