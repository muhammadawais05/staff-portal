import React, { ReactNode, useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'

import { addSharedTranslations } from '../../services/add-shared-translations/add-shared-translations'
import { i18n } from '../../services/i18n/i18n'
import { Translations } from '../../types'

interface Props {
  translations?: Translations
  children?: ReactNode
}

const I18nProvider = ({ children, translations }: Props) => {
  useEffect(() => {
    if (translations) {
      addSharedTranslations(translations)
    }
  }, [translations])

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}

export default I18nProvider
