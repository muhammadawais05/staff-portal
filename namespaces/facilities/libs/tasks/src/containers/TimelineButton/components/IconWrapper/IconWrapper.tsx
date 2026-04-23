import React, { ReactNode } from 'react'
import { Container } from '@toptal/picasso'

import * as S from './styles'

const IconWrapper = ({ children }: { children: ReactNode }) => {
  return <Container css={S.iconWrapper} inline right='small'>
    {children}
  </Container>
}

export default IconWrapper
