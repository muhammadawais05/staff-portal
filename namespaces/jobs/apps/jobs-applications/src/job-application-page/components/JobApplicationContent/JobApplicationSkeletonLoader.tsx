import React from 'react'
import { DetailedListSkeleton } from '@staff-portal/ui'
import { Section, SkeletonLoader } from '@toptal/picasso'

const JobApplicationSkeletonLoader = () => (
  <Section
    variant='withHeaderBar'
    title={<SkeletonLoader.Header />}
    data-testid='job-application-skeleton-loader'
  >
    <DetailedListSkeleton />
    <DetailedListSkeleton />
  </Section>
)

export default JobApplicationSkeletonLoader
