import { Container, Typography } from '@toptal/picasso'
import React from 'react'
import { EmptyBox } from '@staff-portal/ui'

interface Props {
  message: string
}

const NoRequestsMessage = ({ message }: Props) => {
  return (
    <Container
      padded='large'
      flex
      direction='column'
      alignItems='center'
      justifyContent='center'
      data-testid='no-search-results'
    >
      <Container bottom='medium'>
        <EmptyBox />
      </Container>
      <Typography size='medium' variant='heading'>
        {message}
      </Typography>
    </Container>
  )
}

export default NoRequestsMessage
