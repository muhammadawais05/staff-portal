import React from 'react'
import { Container, SkeletonLoader } from '@toptal/picasso'

const ProfileHeaderSkeleton = () => (
  <Container flex alignItems='center' bottom='small'>
    <SkeletonLoader.Media variant='avatar' size='small' />
    <Container left='small'>
      <SkeletonLoader.Typography />
    </Container>
  </Container>
)

export default ProfileHeaderSkeleton
