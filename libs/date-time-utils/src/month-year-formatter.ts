import { format } from 'date-fns'

import { FULL_MONTH_YEAR_FORMAT } from './constants'

export const monthYearFormatter = (
  year: number,
  month: number,
  dateFormat = FULL_MONTH_YEAR_FORMAT
) => format(new Date(year, month), dateFormat)
