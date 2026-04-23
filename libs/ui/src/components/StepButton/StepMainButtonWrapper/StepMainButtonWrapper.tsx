import React, { ReactNode } from 'react'
import { Container } from '@toptal/picasso'

import * as S from './styles'

interface Props {
  children: ReactNode
}

const StepMainButtonWrapper = ({ children }: Props) => {
  return <Container css={S.buttonContainer}>{children}</Container>
}

export default StepMainButtonWrapper
