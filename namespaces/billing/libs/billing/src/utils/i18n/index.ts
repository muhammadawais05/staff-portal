import i18next from 'i18next'
import { lowerCase, startCase } from 'lodash-es'
import { formatAmount, toTitleCase } from '@toptal/picasso/utils'

import { formatDateMed } from '../../_lib/dateTime'
import en from '../../translations/en'
import { formatAsPercentage } from '../../_lib/helpers'

const resources = { en }
const lng: keyof typeof resources = 'en'

type TKey = keyof typeof en

// i18n sets any type for value
// eslint-disable-next-line
const formatter = (value: any, format?: string) => {
  switch (format) {
    case 'lowercase':
      return lowerCase(value)

    case 'startCase':
      return startCase(value)

    case 'titleCase':
      return toTitleCase(value)

    case 'formatAsUSD':
      return formatAmount({ amount: value })

    case 'formatDateMed':
      return formatDateMed(value)

    case 'formatAsPercentage':
      return formatAsPercentage(value)

    case 'formatAsPercentageWithSingleDecimal':
      return formatAsPercentage(value, { precisionMin: 1, precisionMax: 1 })

    default:
      return value
  }
}

// Usage reference:
// https://react.i18next.com/latest/i18next-instance
i18next.init({
  interpolation: {
    escapeValue: false,
    format: formatter
  },
  lng,
  resources
})

export { TKey, resources }
export default i18next
