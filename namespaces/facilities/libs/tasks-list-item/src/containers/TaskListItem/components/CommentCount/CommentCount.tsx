import React from 'react'
import { Message16, Tag } from '@toptal/picasso'

export interface Props {
  count: number | null | undefined
  onClick: () => void
}

const CommentCount = ({ onClick, count }: Props) => (
  <Tag data-testid='comment-count' onClick={onClick} icon={<Message16 />}>
    {count || 0}
  </Tag>
)

export default CommentCount
