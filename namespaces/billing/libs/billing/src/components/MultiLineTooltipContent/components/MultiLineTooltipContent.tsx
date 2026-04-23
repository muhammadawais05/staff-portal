import React, { memo } from 'react'
import { List } from '@toptal/picasso'

const displayName = 'MultiLineTooltipContent'

interface Props {
  messages: string[]
}

const MultiLineTooltipContent = ({ messages = [''] }: Props) => {
  return (
    <List variant='unordered'>
      {messages.map(message => (
        <List.Item data-testid='operation-message' key={message}>
          {message}
        </List.Item>
      ))}
    </List>
  )
}

MultiLineTooltipContent.displayName = displayName

export default memo(MultiLineTooltipContent)
