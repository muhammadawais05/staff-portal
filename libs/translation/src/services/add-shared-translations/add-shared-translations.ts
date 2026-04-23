import { i18n } from '../i18n/i18n'
import { sharedPrefix } from '../../constants'
import { Translations } from '../../types'

export const addSharedTranslations = (translations: Translations) => {
  Object.keys(translations).forEach(language => {
    Object.keys(translations[language]).forEach(namespace => {
      i18n.addResourceBundle(
        language,
        `${sharedPrefix}${namespace}`,
        translations[language][namespace]
      )
    })
  })
}
