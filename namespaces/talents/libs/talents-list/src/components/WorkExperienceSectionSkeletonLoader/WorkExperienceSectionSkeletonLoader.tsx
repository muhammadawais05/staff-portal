import React from 'react'
import { Container, SkeletonLoader } from '@toptal/picasso'

const WorkExperienceSectionSkeletonLoader = () => (
  <Container>
    {[...new Array(2)].map((_, index) => (
      // TODO: replaced by a reusable Component
      // Skeleton loader, no unique id
      // eslint-disable-next-line react/no-array-index-key
      <Container key={index} bottom='small'>
        <Container bottom='small'>
          <SkeletonLoader.Typography />
        </Container>
        <Container bottom='small'>
          <SkeletonLoader.Typography />
        </Container>
        <SkeletonLoader.Typography rows={4} />
      </Container>
    ))}
  </Container>
)

export default WorkExperienceSectionSkeletonLoader
