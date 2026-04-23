import { Container, Typography } from '@toptal/picasso'
import React from 'react'

export const Heading = () => {
  return (
    <Container
      flex
      direction='row'
      alignItems='center'
      justifyContent='space-between'
      bottom='medium'
    >
      <Container flex direction='column'>
        <Typography size='medium'>
          Sort Community Leaders by dragging and dropping from the following
          list
        </Typography>
      </Container>
    </Container>
  )
}
