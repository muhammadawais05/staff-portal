import React from 'react'
import { Container, Typography } from '@toptal/picasso'

interface Props {
  preliminarySearchEnabled?: boolean
}

const PreliminarySearchLabel = ({
  preliminarySearchEnabled = false
}: Props) => {
  const color = preliminarySearchEnabled ? 'green' : 'red'
  const state = preliminarySearchEnabled ? 'enabled' : 'disabled'

  return (
    <Container top='xsmall' data-testid='preliminary-search-label'>
      <Typography as='span' weight='semibold'>
        Job search before engagement ends is{' '}
        <Typography as='span' color={color} weight='semibold'>
          {state}
        </Typography>
        .
      </Typography>
    </Container>
  )
}

export default PreliminarySearchLabel
