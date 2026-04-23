import React from 'react'
import { Container, Typography } from '@toptal/picasso'

import MessagesList from './MessagesList'
import { getFirstMessage } from './utils'

export type Props = {
  stepName: string
  messages?: string | string[] | null
}

const TooltipContent = ({ stepName, messages }: Props) => {
  if (!messages || !messages.length) {
    return (
      <Typography variant='heading' size='small'>
        {stepName}
      </Typography>
    )
  }

  return (
    <Container>
      <Container bottom='xsmall'>
        <Typography variant='heading' size='small'>
          {stepName}
        </Typography>
      </Container>
      {Array.isArray(messages) && messages.length > 1 ? (
        <MessagesList messages={messages} />
      ) : (
        <Container>{getFirstMessage(messages)}</Container>
      )}
    </Container>
  )
}

export default TooltipContent
