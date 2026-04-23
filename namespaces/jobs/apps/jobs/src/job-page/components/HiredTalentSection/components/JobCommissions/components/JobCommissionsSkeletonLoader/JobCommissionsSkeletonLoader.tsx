import { Container, SkeletonLoader } from '@toptal/picasso'
import React from 'react'
import { DetailedListSkeleton } from '@staff-portal/ui'

import { LABEL_COLUMN_WIDTH } from '../../../../constants'
import JobCommissionsLayout from '../JobCommissionsLayout'

const JobCommissionsSkeletonLoader = () => (
  <JobCommissionsLayout>
    <Container data-testid='JobCommissionsSkeletonLoader'>
      <Container top='small' bottom='small'>
        <SkeletonLoader.Header />
      </Container>

      <DetailedListSkeleton labelColumnWidth={LABEL_COLUMN_WIDTH} items={4} />
    </Container>
  </JobCommissionsLayout>
)

export default JobCommissionsSkeletonLoader
