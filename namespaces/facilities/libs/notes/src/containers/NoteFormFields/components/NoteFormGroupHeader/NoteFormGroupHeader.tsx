import { Container, Typography } from '@toptal/picasso'
import React from 'react'

type Props = {
  title: string
}

const NoteFormGroupHeader = ({ title }: Props) => (
  <Container bottom='small'>
    <Typography
      size='medium'
      weight='semibold'
      data-testid='note-form-group-header'
    >
      {title}
    </Typography>
  </Container>
)

export default NoteFormGroupHeader
