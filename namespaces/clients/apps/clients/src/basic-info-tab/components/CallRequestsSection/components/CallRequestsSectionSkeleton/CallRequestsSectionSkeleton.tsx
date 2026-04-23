import React from 'react'
import { Section, SkeletonLoader } from '@toptal/picasso'

const CallRequestsSectionSkeleton = () => {
  return (
    <Section
      title='Call Requests'
      data-testid='CallRequestsSectionSkeleton'
      variant='withHeaderBar'
    >
      <SkeletonLoader.Typography rows={1} />
    </Section>
  )
}

export default CallRequestsSectionSkeleton
