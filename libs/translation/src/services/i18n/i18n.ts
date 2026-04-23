import i18nOriginal from 'i18next'

import { formatter } from '../formatter/formatter'

const customI18nInstance = i18nOriginal.createInstance({
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
    format: formatter
  },
  lng: 'en',
  ns: []
})

customI18nInstance.init()

export { customI18nInstance as i18n }
