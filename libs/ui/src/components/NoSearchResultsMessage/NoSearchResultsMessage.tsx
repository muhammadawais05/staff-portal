import React from 'react'
import { Container, EmptyState } from '@toptal/picasso'

interface Props {
  message: string
}

const NoSearchResultsMessage = ({ message }: Props) => {
  return (
    <Container
      padded='large'
      flex
      alignItems='center'
      justifyContent='center'
      data-testid='no-search-results'
    >
      <EmptyState.Collection>{message}</EmptyState.Collection>
    </Container>
  )
}

export default NoSearchResultsMessage
