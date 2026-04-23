import React from 'react'
import { Section, SkeletonLoader } from '@toptal/picasso'
import { InlineActionsWrapper } from '@staff-portal/operations'

const InvestigationsSkeleton = () => {
  return (
    <Section
      title='Investigations'
      variant='withHeaderBar'
      actions={
        <InlineActionsWrapper>
          <SkeletonLoader.Button size='small' />
          <SkeletonLoader.Button size='small' />
        </InlineActionsWrapper>
      }
    >
      <SkeletonLoader.Typography rows={1} />
    </Section>
  )
}

export default InvestigationsSkeleton
