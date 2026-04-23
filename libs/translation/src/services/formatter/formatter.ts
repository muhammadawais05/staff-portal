import { format as formatDate, isDate } from '@staff-portal/date-time-utils'
import { formatAmount, toTitleCase } from '@toptal/picasso/utils'
import { toStartCase } from '@staff-portal/string'

import { Language } from '../../types'
import { toPercentage } from '../to-percentage/to-percentage'
import { dateLocales } from '../../constants'

// eslint-disable-next-line complexity
export const formatter = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any,
  format?: string,
  lng = 'en'
) => {
  if (typeof value === 'string' || typeof value === 'number') {
    switch (format) {
      case 'percentage':
        return toPercentage(value, {
          precisionMin: 2,
          precisionMax: 2,
          locale: lng as Language
        })
      case 'percentageWithSingleDecimal':
        return toPercentage(value, {
          precisionMin: 1,
          precisionMax: 1,
          locale: lng as Language
        })
      default:
    }
  }

  if (typeof value === 'string') {
    switch (format) {
      case 'lowerCase':
        return value.toLowerCase()
      case 'startCase':
        return toStartCase(value)
      case 'titleCase':
        return toTitleCase(value)
      default:
    }
  }

  if (typeof value === 'number') {
    if (format === 'usd') {
      return formatAmount({ amount: value, currency: 'USD', locale: lng })
    }
  }

  if (isDate(value) && format && lng) {
    const locale = dateLocales[lng as Language]

    return formatDate(value, format, { locale })
  }

  return value
}
