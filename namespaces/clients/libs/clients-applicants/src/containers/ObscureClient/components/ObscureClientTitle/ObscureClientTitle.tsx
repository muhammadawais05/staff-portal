import { Container, Typography } from '@toptal/picasso'
import React from 'react'
import { ClientFragment } from '@staff-portal/clients'

export interface Props {
  company: ClientFragment
}

const ObscureClientTitle = ({ company }: Props) => {
  const { pendingCallbackRequest } = company
  const title = pendingCallbackRequest ? '(Pending Call Request)' : undefined

  return (
    <Container flex alignItems='center'>
      <Typography size='medium' weight='semibold' color='inherit' as='h4'>
        Hidden
      </Typography>
      {title && (
        <Container left='xsmall'>
          <Typography size='small'>{title}</Typography>
        </Container>
      )}
    </Container>
  )
}

export default ObscureClientTitle
