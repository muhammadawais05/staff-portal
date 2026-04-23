import {
  DateTime,
  Duration,
  DurationObject,
  Info,
  Interval,
  LocalZone
} from 'luxon'
import { Scalars } from '@staff-portal/graphql/staff'

import { parse } from '../parse'
import type { ParseDate } from '../parse'
import { WeekStartsOn } from '../../../@types/types'

export const getCurrentTime = (): DateTime => DateTime.local()

export const getCurrentLocalTime = (): DateTime =>
  DateTime.fromObject({ zone: LocalZone.instance.name })

export const getCurrentDayAsJSDate = () =>
  // eslint-disable-next-line @miovision/disallow-date/no-new-date
  new Date(DateTime.local().startOf('day').toISODate())

export const getTimeZone = (): string => getCurrentTime().zoneName
export interface GetDayNamesOfWeek {
  weekStartsOn: WeekStartsOn
  version?: 'narrow' | 'short' | 'long' | undefined
  locale?: string
}

export const getDayNameForDate = (date: ParseDate): string =>
  parse(date).weekdayLong

export const getDayNamesOfWeek = ({
  weekStartsOn,
  version,
  locale = 'en-US'
}: GetDayNamesOfWeek): string[] => {
  const weekNames = Info.weekdays(version || 'short', { locale })

  return weekNames
    .slice(weekStartsOn - 1)
    .concat(weekNames.slice(0, weekStartsOn - 1))
}

export interface GetWeekends {
  version?: 'short'
  weekStartsOn?: WeekStartsOn
}

export const getWeekends = ({ version }: GetWeekends): string[] => {
  const DAYS_OF_WEEK = Info.weekdays(version || 'short')

  return [DAYS_OF_WEEK[5], DAYS_OF_WEEK[6]]
}

export interface IsWeekend {
  date: ParseDate
  weekStartsOn?: WeekStartsOn
}

export const isWeekend = ({ date }: IsWeekend): boolean => {
  // Currently simplified logic everything which is Sat or Sun considered to be weekend
  const dayIndexInWeek = parse(date).weekday

  return [6, 7].includes(dayIndexInWeek)
}

export interface GetDifferenceInDaysInterface {
  start: ParseDate
  end: ParseDate
}

export const getDifferenceInDays = ({
  start,
  end
}: GetDifferenceInDaysInterface): number => {
  const parsedStart = parse(start).startOf('day')
  const parsedEnd = parse(end).startOf('day')
  const difference = Number(parsedEnd.diff(parsedStart).as('days').toFixed())

  return difference > 0 ? difference : 0
}

export const getDifferenceInMinutes = ({
  start,
  end
}: GetDifferenceInDaysInterface): number => {
  const parsedStart = parse(start).startOf('minutes')
  const parsedEnd = parse(end).startOf('minutes')
  const difference = parsedEnd.diff(parsedStart).as('minutes')

  return difference > 0 ? difference : 0
}

export const getDifferenceInSeconds = ({
  start,
  end
}: GetDifferenceInDaysInterface): number => {
  const parsedStart = parse(start).startOf('seconds')
  const parsedEnd = parse(end).startOf('seconds')
  const difference = parsedEnd.diff(parsedStart).as('seconds')

  return difference > 0 ? difference : 0
}

export const getDueDays = (date: ParseDate): number => {
  const differenceInDays = getDifferenceInDays({
    end: getCurrentTime(),
    start: date
  })

  return differenceInDays || 0
}

export const isSameYear = ({
  start,
  end
}: GetDifferenceInDaysInterface): boolean => {
  const parsedStart = parse(start).startOf('year')
  const parsedEnd = parse(end).startOf('year')

  return +parsedStart === +parsedEnd
}

export const isCurrentYear = (date: ParseDate): boolean =>
  isSameYear({
    end: getCurrentTime(),
    start: date
  })

export const isSameMonth = ({
  start,
  end
}: GetDifferenceInDaysInterface): boolean => {
  const parsedStart = parse(start).startOf('month')
  const parsedEnd = parse(end).startOf('month')

  return +parsedStart === +parsedEnd
}

export const isCurrentMonth = (date: ParseDate): boolean =>
  isSameMonth({
    end: getCurrentTime(),
    start: date
  })

export const isSameDay = ({
  start,
  end
}: GetDifferenceInDaysInterface): boolean => {
  const parsedStart = parse(start).startOf('day')
  const parsedEnd = parse(end).startOf('day')

  return +parsedStart === +parsedEnd
}

export const isCurrentDay = (date: ParseDate): boolean =>
  isSameDay({
    end: getCurrentTime(),
    start: date
  })

export const isAfter = ({
  start,
  end
}: GetDifferenceInDaysInterface): boolean => {
  const parsedStart = parse(start)
  const parsedEnd = parse(end)

  return +parsedStart < +parsedEnd
}

export const isFutureDate = (date: ParseDate): boolean =>
  isAfter({
    end: date,
    start: getCurrentTime()
  })

export const isBefore = ({
  start,
  end
}: GetDifferenceInDaysInterface): boolean => {
  const parsedStart = parse(start)
  const parsedEnd = parse(end)

  return +parsedEnd < +parsedStart
}

export const isValid = (date: ParseDate): boolean => parse(date).isValid

export const getEachDayOfInterval = ({
  start,
  end
}: GetDifferenceInDaysInterface): string[] => {
  const startDay = parse(start)
  const dayDifference = Math.round(
    getDifferenceInDays({ end, start: startDay })
  )

  return Array.from(new Array(dayDifference + 1)).map((val, idx) =>
    startDay.plus({ days: idx }).toISODate()
  )
}

export interface GetEachStartDayOfWeeks extends GetDifferenceInDaysInterface {
  weekStartsOn: 1 | 7
}

/**
 *
 * @remarks `weekStartsOn` expects either a 1: Monday, or 7: Sunday
 */
export const getEachStartDayOfWeeks = ({
  start,
  end,
  weekStartsOn
}: GetEachStartDayOfWeeks): Scalars['Date'][] => {
  let startOfWeekPeriod: DateTime = parse(start)
  let endOfWeekPeriod: DateTime = parse(end)
  const weekEndsOn = weekStartsOn === 1 ? 7 : weekStartsOn - 1

  if (startOfWeekPeriod.weekday !== weekStartsOn) {
    startOfWeekPeriod = startOfWeekPeriod.plus({
      days: -(weekStartsOn === 7
        ? startOfWeekPeriod.weekday
        : startOfWeekPeriod.weekday - 1)
    })
  }

  if (endOfWeekPeriod.weekday !== weekEndsOn) {
    endOfWeekPeriod = endOfWeekPeriod.plus({
      days: endOfWeekPeriod.weekday === 7 ? 6 : 7 - endOfWeekPeriod.weekday
    })
  }

  const dayDifference = getDifferenceInDays({
    end: endOfWeekPeriod,
    start: startOfWeekPeriod
  })
  const numberOfWeeks = Math.ceil(dayDifference / 7)

  return Array.from(new Array(numberOfWeeks)).map(
    (val, idx) =>
      startOfWeekPeriod.plus({ days: idx * 7 }).toISODate() as Scalars['Date']
  )
}

interface IsIntervalContains {
  start: ParseDate
  end: ParseDate
  date: ParseDate
}

export const isIntervalContains = ({
  start,
  end,
  date
}: IsIntervalContains): boolean =>
  Interval.fromDateTimes(parse(start), parse(end).plus({ day: 1 })).contains(
    parse(date)
  )

export const getHoursMinutes = (
  dateObject: DurationObject
): { hours: number; minutes: number } => {
  const { hours, minutes } = Duration.fromObject(dateObject)
    .shiftTo('hours', 'minutes')
    .toObject()

  return {
    hours: (hours && Number(hours.toFixed())) || 0,
    minutes: (minutes && Number(minutes.toFixed())) || 0
  }
}

export const getMinutes = (object: DurationObject): number =>
  Number(Duration.fromObject(object).shiftTo('minutes').minutes.toFixed())

export const getISODay = (date: ParseDate, offset: number): Scalars['Date'] =>
  parse(date).plus({ days: offset }).toISODate() as Scalars['Date']

export enum TimePeriod {
  Quarter = 'quarter',
  Year = 'year',
  All = 'all'
}

export const MaxPastDate = DateTime.local(1970, 1, 1)

export const getStartDateForPeriod = (period: TimePeriod) => {
  let startDate: DateTime

  const now = DateTime.local()

  switch (period) {
    case TimePeriod.Quarter: {
      startDate = DateTime.local(now.year, (now.quarter - 1) * 3 + 1, 1)
      break
    }
    case TimePeriod.Year: {
      startDate = DateTime.local(now.year, 1, 1)
      break
    }
    case TimePeriod.All:
    default: {
      startDate = MaxPastDate
      break
    }
  }

  return startDate
}

export const getOneMonthAgoDate = (): Scalars['Date'] =>
  DateTime.local().minus({ months: 1 }).toISODate() as Scalars['Date']
