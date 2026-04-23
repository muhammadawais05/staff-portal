import React from 'react'
import { Container, Typography } from '@toptal/picasso'

type Props = {
  question: string
}

const ContentWithoutPendingCallbackRequest = ({ question }: Props) => (
  <>
    <Container bottom='medium'>
      <Typography
        size='medium'
        data-testid='content-without-pending-callback-request-question'
      >
        {question}
      </Typography>
    </Container>
    <Container>
      <Typography
        weight='semibold'
        size='medium'
        data-testid='content-without-pending-callback-request-message'
      >
        You will be responsible for their application.
      </Typography>
    </Container>
  </>
)

export default ContentWithoutPendingCallbackRequest
