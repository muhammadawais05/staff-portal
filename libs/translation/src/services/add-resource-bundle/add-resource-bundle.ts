import { i18n } from '../i18n/i18n'
import { Translations } from '../../types'

export const addResourceBundle = ({
  ns,
  translations
}: {
  ns: string
  translations: Translations
}) =>
  Object.keys(translations).forEach(language => {
    Object.keys(translations[language]).forEach(subNamespace => {
      i18n.addResourceBundle(
        language,
        `${ns}/${subNamespace}`,
        translations[language][subNamespace]
      )
    })
  })
