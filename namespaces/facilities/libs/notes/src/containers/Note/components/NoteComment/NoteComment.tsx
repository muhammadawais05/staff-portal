import { Typography, TypographyProps } from '@toptal/picasso'
import React from 'react'
import { MakeLinksInteractive } from '@staff-portal/ui'

import * as S from './styles'

export interface NoteCommentProps
  extends Pick<TypographyProps, 'size' | 'weight'> {
  comment: string
}

const NoteComment = ({ comment, weight, size }: NoteCommentProps) => (
  <Typography color='inherit' size={size} weight={weight} css={S.noteComment}>
    <MakeLinksInteractive>{comment}</MakeLinksInteractive>
  </Typography>
)

export default NoteComment
