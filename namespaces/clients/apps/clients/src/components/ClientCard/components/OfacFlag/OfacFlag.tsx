import React from 'react'
import { Tag, Tooltip } from '@toptal/picasso'

import * as S from './styles'

// TODO: remove this workaround when https://github.com/toptal/davinci/pull/584 is merged
const TagRectangular = Tag.Rectangular

export interface Props {
  title: string
  comment?: string | null
}

export const OfacFlag = ({ title, comment }: Props) => {
  const tag = (
    <TagRectangular variant='red' titleCase={false} css={S.helpCursor}>
      {title}
    </TagRectangular>
  )

  if (!comment) {
    return tag
  }

  return <Tooltip content={comment}>{tag}</Tooltip>
}
