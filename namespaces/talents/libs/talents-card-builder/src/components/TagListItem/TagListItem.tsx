import React from 'react'
import { Tag } from '@toptal/picasso'

import { TagItem } from '../../types'
import * as S from './styles'

interface Props {
  tagItem: TagItem
  isDragging?: boolean
  isGrabbed?: boolean
  'data-testid'?: string
}

const TagListItem = ({
  tagItem,
  isDragging = false,
  isGrabbed = false,
  'data-testid': dataTestId
}: Props) => (
  <Tag css={S.tagListItem({ isDragging, isGrabbed })} data-testid={dataTestId}>
    {tagItem.name}
    {tagItem.experience ? ` (${tagItem.experience})` : null}
  </Tag>
)

export default TagListItem
