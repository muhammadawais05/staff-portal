import { DateTime, Duration, Interval } from 'luxon'
import pluralize from 'pluralize'
import { Scalars } from '@staff-portal/graphql/staff'

import { parse } from '../parse'
import type { ParseDate } from '../parse'
import {
  getCurrentTime,
  isCurrentYear,
  isSameDay,
  isSameMonth,
  isSameYear
} from '../helper'

/**
 * Time Formatters
 */
export const formatTime = (date: ParseDate): string =>
  parse(date)
    .toLocaleString(DateTime.TIME_SIMPLE)
    .toLocaleLowerCase()
    .replace(/\s/g, '')

export interface FormatTimeFromSecondsInterface {
  defaultValue?: string
}

export const formatTimeFromSeconds = (
  seconds: number,
  options: FormatTimeFromSecondsInterface = {}
): string => {
  if (!seconds) {
    return options.defaultValue || '00:00'
  }

  if (seconds > 0 && seconds < 60) {
    return `${seconds} ${pluralize('sec', seconds)}`
  }

  const durTime = Duration.fromObject({ seconds })

  if (!durTime.isValid) {
    return options.defaultValue || '00:00'
  }

  return durTime.toFormat('hh:mm')
}

export const formatTimeDisplay = (date: ParseDate): string =>
  parse(date).toFormat('HH:mm')

export interface FormatTimeInWordsInterface {
  seconds: number
  options?: {
    abbr?: boolean
  }
}

export const formatTimeInWords = ({
  seconds,
  options = {}
}: FormatTimeInWordsInterface): string => {
  if (!seconds) {
    return '—'
  }

  const { hours, minutes } = Duration.fromObject({ seconds })
    .shiftTo('hours', 'minutes')
    .toObject()

  const roundedHrs = hours ? Math.round(hours) : 1
  const roundedMin = minutes ? Math.floor(minutes) : 1

  const ret = []

  if (!roundedHrs && !roundedMin) {
    return '—'
  }

  if (hours) {
    ret.push(
      `${roundedHrs} ${options.abbr ? 'h' : pluralize('hour', roundedHrs)}`
    )
  }

  if (minutes) {
    ret.push(
      `${roundedMin} ${options.abbr ? 'm' : pluralize('minute', roundedMin)}`
    )
  }

  return ret.join(' ')
}

/**
 * Date Formatters
 */
export const formatDateParsed = (
  date: DateTime,
  options: FormatDateParsedOptionsInterface = {}
): string =>
  options.showYear || !isCurrentYear(date)
    ? formatDateMed(date)
    : renderDateWithoutYear(date)

export const formatDate = (date: ParseDate): string =>
  formatDateParsed(parse(date))

export interface FormatDateParsedOptionsInterface {
  showYear?: boolean
}

export const formatDateMed = (date: ParseDate): string =>
  parse(date).toLocaleString(DateTime.DATE_MED)

export const formatDateFull = (date: ParseDate | string): string =>
  parse(date).toLocaleString(DateTime.DATE_FULL)

export const formatDateShort = (date: ParseDate): string =>
  parse(date).toLocaleString({ month: 'short', year: 'numeric' })

export const formatDateLongMonthYear = (date: ParseDate): string =>
  parse(date).toLocaleString({ month: 'long', year: 'numeric' })

const renderDateWithoutYear = (date: DateTime): string =>
  `${date.get('monthShort')} ${date.get('day')}`

export const formatDateMedWithTime = (date: ParseDate): string =>
  `${formatDateMed(date)} at ${formatTime(date)}`

export const formatDateShortDayName = (date: ParseDate): string =>
  parse(date).weekdayShort

export const formatDateURL = (date: ParseDate): Scalars['Date'] =>
  parse(date).toISODate() as Scalars['Date']

export interface FormatDateRangeInterface {
  start: ParseDate
  end: ParseDate
  options?: FormatDateParsedOptionsInterface
}

export const formatDateRange = ({
  start,
  end
}: FormatDateRangeInterface): string => {
  const parsedStart = parse(start)
  const parsedEnd = parse(end)
  const compareData = { end: parsedEnd, start: parsedStart }

  if (isSameYear(compareData)) {
    const isCurrYear = isCurrentYear(parsedStart)
    const startFormat = renderDateWithoutYear(parsedStart)

    if (isSameMonth(compareData)) {
      if (isSameDay(compareData)) {
        if (isCurrYear) {
          return startFormat
        }

        return `${startFormat}, ${parsedEnd.get('year')}`
      }
      if (isCurrYear) {
        return `${startFormat} — ${parsedEnd.get('day')}`
      }

      return `${startFormat} — ${parsedEnd.get('day')}, ${parsedEnd.get(
        'year'
      )}`
    }
    if (isCurrYear) {
      return `${startFormat} — ${renderDateWithoutYear(parsedEnd)}`
    }

    return `${startFormat} — ${formatDateMed(parsedEnd)}`
  }

  return `${formatDateParsed(parsedStart)} — ${formatDateParsed(parsedEnd)}`
}

export const formatDistanceInWordsToNow = (
  date: ParseDate,
  shortVersion = false
): string => {
  // Copy of
  // https://github.com/date-fns/date-fns/blob/v1.30.1/src/distance_in_words/index.js
  const dateLeft = parse(date)
  const dateRight = getCurrentTime()
  const { seconds, minutes, hours, days, weeks, months, years } =
    Interval.fromDateTimes(dateLeft, dateRight)
      .toDuration([
        'years',
        'months',
        'weeks',
        'days',
        'hours',
        'minutes',
        'seconds'
      ])
      .toObject()

  if (years && years > 0) {
    if (shortVersion || !months) {
      return `${years} ${pluralize('year', years)} ago`
    } else if (months && months < 3) {
      return `about ${years} ${pluralize('year', years)} ago`
    } else if (months && months < 9) {
      return `over ${years} ${pluralize('year', years)} ago`
    }

    return `almost ${years + 1} ${pluralize('year', years)} ago`
  }

  if (months && months > 0) {
    if (shortVersion || !weeks) {
      return `${months} ${pluralize('month', months)} ago`
    } else if (weeks && weeks < 1) {
      return `about ${months} ${pluralize('month', months)} ago`
    } else if (months && months < 3) {
      return `over ${months} ${pluralize('month', months)} ago`
    }

    return `almost ${months + 1} ${pluralize('month', months)} ago`
  }

  if (weeks && weeks > 0) {
    if (shortVersion || !days) {
      return `${weeks} ${pluralize('week', weeks)} ago`
    } else if (days && days < 3) {
      return `about ${weeks} ${pluralize('week', weeks)} ago`
    } else if (days && days < 20) {
      return `over ${weeks} ${pluralize('week', weeks)} ago`
    }

    return `almost ${weeks + 1} ${pluralize('week', weeks)} ago`
  }

  if (days && days > 0) {
    if (shortVersion || !hours) {
      return `${days} ${pluralize('day', days)} ago`
    } else if (hours && hours < 12) {
      return `about ${days} ${pluralize('day', days)} ago`
    } else if (hours && hours < 20) {
      return `over ${days} ${pluralize('day', days)} ago`
    }

    return `almost ${days + 1} ${pluralize('day', days)} ago`
  }

  if (hours && hours > 0) {
    if (shortVersion || !minutes) {
      return `${hours} ${pluralize('hour', hours)} ago`
    } else if (minutes && minutes < 20) {
      return `about ${hours} ${pluralize('hour', hours)} ago`
    } else if (minutes && minutes < 42) {
      return `over ${hours} ${pluralize('hour', hours)} ago`
    }

    return `almost ${hours + 1} ${pluralize('hour', hours)} ago`
  }

  if (minutes && minutes > 0) {
    if (shortVersion || !seconds) {
      return `${minutes} ${pluralize('minute', minutes)} ago`
    } else if (seconds && seconds < 20) {
      return `about ${minutes} ${pluralize('minute', minutes)} ago`
    } else if (seconds && seconds < 40) {
      return `over ${minutes} ${pluralize('minute', minutes)} ago`
    }

    return `almost ${minutes + 1} ${pluralize('minute', minutes)} ago`
  }

  return 'less than a minute ago'
}

export const formatToKeepOriginalDate = (date: Date): Scalars['Date'] => {
  return date.getTimezoneOffset() < 0
    ? (parse(date).toISODate() as Scalars['Date'])
    : (parse(date)
        .plus({ minutes: date.getTimezoneOffset() })
        .toISODate() as Scalars['Date'])
}
