import React from 'react'
import { Container, SkeletonLoader } from '@toptal/picasso'

const TalentHeaderSkeleton = () => (
  <Container flex justifyContent='space-between'>
    <Container flex alignItems='center' bottom='small'>
      <SkeletonLoader.Media variant='avatar' size='small' />
      <Container left='small'>
        <SkeletonLoader.Typography />
      </Container>
    </Container>
  </Container>
)

export default TalentHeaderSkeleton
