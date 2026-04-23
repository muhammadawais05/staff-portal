import { i18n } from '../i18n/i18n'
import { Translations } from '../../types'

export const removeResourceBundle = ({
  ns,
  translations
}: {
  ns: string
  translations: Translations
}) =>
  Object.keys(translations).forEach(language => {
    Object.keys(translations[language]).forEach(subNamespace => {
      i18n.removeResourceBundle(language, `${ns}/${subNamespace}`)
    })
  })
