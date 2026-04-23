import { DateTime } from 'luxon'
import { isDate, isString } from 'lodash-es'
import { Scalars } from '@staff-portal/graphql/staff'

export type ParseDate = Date | DateTime | Scalars['Date'] | Scalars['Time']

export const parseISOTime = (date: string): DateTime => DateTime.fromISO(date)

export const parseJSDate = (date: Date): DateTime => DateTime.fromJSDate(date)

export const parseMillis = (date: number): DateTime => DateTime.fromMillis(date)

export const parse = (date: ParseDate | string): DateTime => {
  if (isDate(date)) {
    return parseJSDate(date)
  } else if (isString(date)) {
    return parseISOTime(date)
  }

  return date
}

export const convertToJSDate = (date: Scalars['Date']): Date =>
  parse(date)?.toJSDate()
