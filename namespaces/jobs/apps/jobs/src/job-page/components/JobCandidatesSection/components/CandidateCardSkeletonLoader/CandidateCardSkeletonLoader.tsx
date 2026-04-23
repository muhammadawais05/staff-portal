import React from 'react'
import { Container, SkeletonLoader } from '@toptal/picasso'
import { TableSkeleton } from '@staff-portal/ui'

export const CandidateCardSkeletonLoader = () => (
  <Container padded='small' data-testid='candidate-card-loader'>
    <Container flex bottom='small' alignItems='center'>
      <SkeletonLoader.Media variant='avatar' size='small' />
      <Container flex alignItems='center' left='small'>
        <SkeletonLoader.Header size='small' />
      </Container>
    </Container>
    <Container bottom='small'>
      <TableSkeleton cols={4} rows={3} />
    </Container>
  </Container>
)

export default CandidateCardSkeletonLoader
