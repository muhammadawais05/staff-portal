import React, { ReactNode } from 'react'
import { Container } from '@toptal/picasso'

import * as S from './styles'

const ModalContainer = ({ children }: { children: ReactNode }) => {
  return <Container css={S.modalContainer}>{children}</Container>
}

ModalContainer.displayName = 'ModalContainer'

export default ModalContainer
