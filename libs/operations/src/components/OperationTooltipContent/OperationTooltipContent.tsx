import { List, Typography } from '@toptal/picasso'
import Markdown from 'react-markdown'
import React from 'react'

export interface Props {
  messages: string[]
}

const parsedMarkdown = (markdown: string) => (
  <Markdown disallowedTypes={['paragraph']} unwrapDisallowed>
    {markdown}
  </Markdown>
)

const OperationTooltipContent = ({ messages }: Props) => {
  if (messages.length === 1) {
    return parsedMarkdown(messages[0])
  }

  return (
    <List variant='unordered'>
      {messages.map(message => (
        <List.Item key={message}>
          <Typography as='span'>{parsedMarkdown(message)}</Typography>
        </List.Item>
      ))}
    </List>
  )
}

export default OperationTooltipContent
