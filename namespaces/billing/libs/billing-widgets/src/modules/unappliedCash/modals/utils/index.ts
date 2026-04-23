import { DateTime } from 'luxon'
import { AnyObject } from '@toptal/picasso-forms'
import {
  formatToKeepOriginalDate,
  isAfter
} from '@staff-portal/billing/src/_lib/dateTime'

const TUESDAY = 2
const FRIDAY = 5
const SATURDAY = 6
const SUNDAY = 7
const DATE_FORMAT = 'yyyy-MM-dd'

const adjustValues = (changes: AnyObject) => {
  return {
    ...changes,
    amount: parseFloat(changes.amount),
    effectiveDate: DateTime.fromJSDate(changes.effectiveDate).toISODate()
  }
}

const convertToJSDate = (isoDate: string) => {
  const [year, month, day] = isoDate.split('-')

  // eslint-disable-next-line @miovision/disallow-date/no-new-date
  return new Date(Number(year), Number(month) - 1, Number(day))
}

export const getCurrentDay = () => convertToJSDate(DateTime.local().toISODate())

export const getMinimumDate = () => {
  const now = DateTime.utc()
  const isWeekend =
    (now.weekday === SATURDAY || now.weekday === SUNDAY) && now.day <= 3
  const isWeekday = now.weekday <= FRIDAY && now.day <= 2
  // When month started with a weekend.
  // Example Mon 4th January 2021
  const isStartOfTheWeekFromWeekend = now.weekday <= TUESDAY && now.day <= 4

  if (isWeekend || isWeekday || isStartOfTheWeekFromWeekend) {
    return convertToJSDate(
      now.minus({ months: 1 }).startOf('month').toISODate()
    )
  }

  return convertToJSDate(now.startOf('month').toISODate())
}

export const getMinimumInvoiceDateRange = (date = '') => {
  const minimumRequiredDate = getMinimumDate()
  // Minimum date is either an invoice issue date or a minimumRequiredDate (whatever is later)
  const invoiceIssueDate = DateTime.fromFormat(date, DATE_FORMAT).toJSDate()

  const maxDate = convertToJSDate(DateTime.local().toISODate())

  const minDate =
    invoiceIssueDate &&
    isAfter({
      start: minimumRequiredDate,
      end: invoiceIssueDate
    })
      ? formatToKeepOriginalDate(invoiceIssueDate)
      : formatToKeepOriginalDate(minimumRequiredDate)

  const minDateIsGreaterThanMaxDate = isAfter({ start: maxDate, end: minDate })

  return {
    minDate: convertToJSDate(minDate),
    maxDate: minDateIsGreaterThanMaxDate ? convertToJSDate(minDate) : maxDate
  }
}

export default adjustValues
