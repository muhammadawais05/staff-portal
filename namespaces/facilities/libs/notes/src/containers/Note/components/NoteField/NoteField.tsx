import { Container, Typography } from '@toptal/picasso'
import React, { ReactNode } from 'react'

import * as S from './styles'

interface Props {
  question: string
  children: ReactNode
}

const NoteField = ({ question, children }: Props) => (
  <Container bottom='small' css={S.noteField}>
    <Typography color='inherit' size='medium' weight='semibold'>
      {question}
    </Typography>
    <Typography forwardedAs='div' color='inherit' css={S.noteFieldChildren}>
      {children}
    </Typography>
  </Container>
)

export default NoteField
