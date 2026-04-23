import React, { useContext } from 'react'
import { Trans as TransI18next, TransProps } from 'react-i18next'

import { sharedPrefix } from '../../constants'
import { I18nNsProviderContext } from '../I18nNsProvider/I18nNsProvider'

interface Props extends TransProps<string> {
  i18nKey: string
}

const Trans = ({ i18nKey, ...rest }: Props) => {
  const ns = useContext(I18nNsProviderContext)

  return (
    <TransI18next
      i18nKey={i18nKey.startsWith(sharedPrefix) ? i18nKey : `${ns}/${i18nKey}`}
      {...rest}
    />
  )
}

export default Trans
