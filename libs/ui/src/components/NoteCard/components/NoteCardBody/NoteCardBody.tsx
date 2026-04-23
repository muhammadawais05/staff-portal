import React from 'react'
import { Container, ContainerProps } from '@toptal/picasso'

import * as S from './styles'

export type NoteBodyProps = ContainerProps

const NoteCardBody = ({ children, ...rest }: NoteBodyProps) => (
  <Container css={S.noteCardBody} {...rest}>
    {children}
  </Container>
)

export default NoteCardBody
