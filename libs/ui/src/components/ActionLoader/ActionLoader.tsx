import React from 'react'
import { Container, SkeletonLoader } from '@toptal/picasso'

export const ActionLoader = ({
  circular = false
}: { circular?: boolean }) => {
  return <Container left='xsmall'>
    <SkeletonLoader.Button size='small' circular={circular} />
  </Container>
}

export default ActionLoader
