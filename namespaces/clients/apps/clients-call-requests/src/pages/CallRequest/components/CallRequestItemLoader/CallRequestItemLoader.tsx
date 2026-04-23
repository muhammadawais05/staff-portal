import React from 'react'
import { Container, SkeletonLoader } from '@toptal/picasso'

const CallRequestItemLoader = () => (
  <Container data-testid='call-request-item-skeleton'>
    <Container flex alignItems='center'>
      <Container right='small'>
        <SkeletonLoader.Media variant='avatar' size='xsmall' />
      </Container>
      <SkeletonLoader.Typography />
      <Container left='small'>
        <SkeletonLoader.Button />
      </Container>
      <Container left='small'>
        <SkeletonLoader.Button />
      </Container>
    </Container>
    <SkeletonLoader.Typography rows={6} />
  </Container>
)

export default CallRequestItemLoader
