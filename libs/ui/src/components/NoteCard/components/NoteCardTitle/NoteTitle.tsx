import React from 'react'
import { TypographyProps, TypographyOverflow } from '@toptal/picasso'

export interface NoteTitleProps
  extends Pick<TypographyProps, 'size' | 'weight'> {
  title: string
}

const NoteTitle = ({ title, size, weight = 'semibold' }: NoteTitleProps) => {
  return (
    <TypographyOverflow size={size} color='inherit' weight={weight}>
      {title}
    </TypographyOverflow>
  )
}

export default NoteTitle
