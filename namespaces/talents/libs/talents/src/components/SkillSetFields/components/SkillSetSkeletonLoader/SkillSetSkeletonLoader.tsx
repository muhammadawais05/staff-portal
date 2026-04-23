import { Container, SkeletonLoader } from '@toptal/picasso'
import React from 'react'

export const SkillSetSkeletonLoader = () => (
  <div>
    <Container flex>
      {[...Array(9)].map((__, index) => (
        // TODO: replaced by a reusable Component
        // Skeleton loader, no unique id
        // eslint-disable-next-line react/no-array-index-key
        <Container right='xsmall' key={index}>
          <SkeletonLoader.Typography />
        </Container>
      ))}
    </Container>
    <Container flex>
      {[...Array(5)].map((__, index) => (
        // TODO: replaced by a reusable Component
        // Skeleton loader, no unique id
        // eslint-disable-next-line react/no-array-index-key
        <Container right='xsmall' key={index}>
          <SkeletonLoader.Typography />
        </Container>
      ))}
    </Container>
    <Container flex>
      {[...Array(7)].map((__, index) => (
        // TODO: replaced by a reusable Component
        // Skeleton loader, no unique id
        // eslint-disable-next-line react/no-array-index-key
        <Container right='xsmall' key={index}>
          <SkeletonLoader.Typography />
        </Container>
      ))}
    </Container>
  </div>
)
