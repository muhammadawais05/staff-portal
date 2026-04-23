import React, { ReactNode } from 'react'
import { Loader } from '@toptal/picasso'

import * as S from './styles'

const CenteredLoader = ({ children, style, loading }: {
  loading: boolean
  style?: string
  top?: number
  children?: ReactNode
}) => {
  return <div css={S.wrapper}>
    {loading && <Loader css={[S.loadingIndicator, style]} />}
    {children}
  </div>
}

export default CenteredLoader
