import React from 'react'
import { Container, SkeletonLoader } from '@toptal/picasso'

const SectionSkeletonLoader = () => {
  return <Container data-testid='SectionSkeletonLoader'>
    <SkeletonLoader.Typography rows={2} />
  </Container>
}

export default SectionSkeletonLoader
