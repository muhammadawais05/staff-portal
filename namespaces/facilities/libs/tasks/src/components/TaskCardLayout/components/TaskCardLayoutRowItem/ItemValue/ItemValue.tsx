import React, { ReactNode } from 'react'
import { TypographyOverflow } from '@toptal/picasso'
import { NO_VALUE } from '@staff-portal/config'

import { hasContent } from '../utils'

export interface ItemValueProps {
  label: ReactNode
  content: ReactNode
}

const ItemValue = ({ label, content }: ItemValueProps) => {
  const hasLabel = hasContent(label)
  const hasValue = hasContent(content)

  if (!hasLabel && !hasValue) {
    return null
  }

  if (hasLabel && !hasValue) {
    return <>{NO_VALUE}</>
  }

  if (typeof content !== 'string') {
    return <>{content}</>
  }

  return (
    <TypographyOverflow size='inherit' noWrap>
      {content}
    </TypographyOverflow>
  )
}

export default ItemValue
