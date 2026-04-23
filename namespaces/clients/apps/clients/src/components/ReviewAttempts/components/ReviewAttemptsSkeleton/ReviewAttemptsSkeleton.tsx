import React from 'react'
import { Section, SkeletonLoader } from '@toptal/picasso'

const ReviewAttemptsSkeleton = () => {
  return (
    <Section title='Review Attempts' variant='withHeaderBar'>
      <SkeletonLoader.Typography rows={1} />
    </Section>
  )
}

export default ReviewAttemptsSkeleton
