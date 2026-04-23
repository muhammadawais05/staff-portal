import React from 'react'
import { DetailedListSkeleton } from '@staff-portal/ui'
import { Container, SkeletonLoader } from '@toptal/picasso'

import SectionContainer from '../SectionContainer'

const Skeleton = () => (
  <SectionContainer actions={<SkeletonLoader.Button size='small' />}>
    <Container flex justifyContent='space-between'>
      <Container flex alignItems='center' bottom='small'>
        <SkeletonLoader.Media variant='avatar' size='small' />
        <Container left='small'>
          <SkeletonLoader.Typography />
        </Container>
      </Container>
    </Container>

    <DetailedListSkeleton
      striped
      divided
      labelColumnWidth={10}
      columns={1}
      items={25}
    />
  </SectionContainer>
)

export default Skeleton
