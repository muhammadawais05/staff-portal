import React from 'react'
import { Container, Section, SkeletonLoader } from '@toptal/picasso'
import { DetailedListSkeleton } from '@staff-portal/ui'

const PlaybookTemplateCardSkeletonLoader = () => (
  <Container top='medium'>
    <Section variant='withHeaderBar' title={<SkeletonLoader.Typography />}>
      <DetailedListSkeleton columns={2} items={8} />
    </Section>
  </Container>
)

export default PlaybookTemplateCardSkeletonLoader
