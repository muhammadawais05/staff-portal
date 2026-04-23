import React from 'react'
import { Container, SkeletonLoader } from '@toptal/picasso'

const HealthStatusSkeleton = () => {
  return <Container flex justifyContent='space-between' data-testid='skeleton-loader'>
    <SkeletonLoader.Header />
    <Container flex>
      <SkeletonLoader.Button size='small' />
      <Container left='small'>
        <SkeletonLoader.Button size='small' />
      </Container>
    </Container>
  </Container>
}

export default HealthStatusSkeleton
