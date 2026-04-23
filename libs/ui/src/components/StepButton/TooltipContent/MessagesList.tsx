import { List } from '@toptal/picasso'
import React from 'react'

type Props = {
  messages: string[]
}

const MessagesList = ({ messages }: Props) => {
  return messages.length > 0 ? (
    <List>
      {messages.map(message => (
        <List.Item key={message}>{message}</List.Item>
      ))}
    </List>
  ) : null
}

export default MessagesList
