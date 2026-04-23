import { DEFAULT_DATE_FORMAT, DEFAULT_TIME_FORMAT } from './constants'
import formatDate from './format-date'
import getDateWithoutTimezone from './get-date-without-timezone'

// A not very pleasant fallback for some cases we found, when the system may give wrong values
export const UNDEFINED_VALUE = 'not set'

export const getFormattedDate = (
  dateTimeString?: string | null,
  format: 'time' | 'date' = 'date'
): string => {
  if (!dateTimeString) {
    return UNDEFINED_VALUE
  }

  return formatDate(getDateWithoutTimezone(dateTimeString), {
    dateFormat: format === 'date' ? DEFAULT_DATE_FORMAT : DEFAULT_TIME_FORMAT
  })
}
