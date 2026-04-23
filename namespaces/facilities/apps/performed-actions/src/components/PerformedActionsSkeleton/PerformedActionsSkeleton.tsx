import React from 'react'
import { Section, SkeletonLoader } from '@toptal/picasso'
import { TableSkeleton } from '@staff-portal/ui'

const PerformedActionsSkeleton = () => (
  <Section title={<SkeletonLoader.Typography />} variant='withHeaderBar'>
    <TableSkeleton cols={2} rows={3} showHeader={false} variant='striped' />
  </Section>
)

export default PerformedActionsSkeleton
