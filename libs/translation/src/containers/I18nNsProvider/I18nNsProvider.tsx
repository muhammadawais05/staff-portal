import React, { createContext, ReactNode, useEffect } from 'react'

import { addResourceBundle } from '../../services/add-resource-bundle/add-resource-bundle'
import { removeResourceBundle } from '../../services/remove-resource-bundle/remove-resource-bundle'
import { Translations } from '../../types'

type Props = {
  ns: string
  translations?: Translations
  children: ReactNode
}

export const I18nNsProviderContext = createContext('')

const I18nNsProvider = ({ ns, translations, children }: Props) => {
  useEffect(() => {
    if (translations) {
      addResourceBundle({ ns, translations })

      return () => {
        removeResourceBundle({ ns, translations })
      }
    }
  }, [ns, translations])

  return (
    <I18nNsProviderContext.Provider value={ns}>
      {children}
    </I18nNsProviderContext.Provider>
  )
}

export default I18nNsProvider
