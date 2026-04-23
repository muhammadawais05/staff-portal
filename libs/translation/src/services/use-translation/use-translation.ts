import { TOptions } from 'i18next'
import { useContext } from 'react'
import {
  useTranslation as useTranslationI18next,
  UseTranslationOptions
} from 'react-i18next'

import { I18nNsProviderContext } from '../../containers/I18nNsProvider/I18nNsProvider'
import { sharedPrefix } from '../../constants'

export const useTranslation = (
  ns: string | string[],
  ...useTranslationRest: [UseTranslationOptions] | []
) => {
  const libName = useContext(I18nNsProviderContext)
  const nsAsArray = typeof ns === 'string' ? [ns] : ns

  const getPrefixedNs = (namespace: string) =>
    namespace.startsWith(sharedPrefix) ? namespace : `${libName}/${namespace}`

  const customUseTranslation = useTranslationI18next(
    nsAsArray.map(getPrefixedNs),
    ...useTranslationRest
  )

  return {
    ...customUseTranslation,
    translate: (
      key: string,
      ...translateRest: [TOptions] | [string, TOptions] | []
    ) =>
      customUseTranslation.t(
        typeof ns === 'string' ? key : getPrefixedNs(key),
        ...translateRest
      )
  }
}
