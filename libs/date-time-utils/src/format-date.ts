import { utcToZonedTime, format } from 'date-fns-tz'

import { DEFAULT_DATE_FORMAT } from './constants'

const formatDate = <TFormattedDate extends string = string>(
  date?: Date | null,
  options: {
    dateFormat?: string
    timeZone?: string
  } = {}
): TFormattedDate => {
  if (!date) {
    return '' as TFormattedDate
  }

  const { dateFormat = DEFAULT_DATE_FORMAT, timeZone } = options

  const dateToFormat = timeZone ? utcToZonedTime(date, timeZone) : date

  return format(dateToFormat, dateFormat, { timeZone }) as TFormattedDate
}

export default formatDate
