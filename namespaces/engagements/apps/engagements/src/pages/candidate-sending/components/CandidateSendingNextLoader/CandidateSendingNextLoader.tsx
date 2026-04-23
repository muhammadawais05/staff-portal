import { Container, SkeletonLoader } from '@toptal/picasso'
import React from 'react'

interface Props {
  rows?: number
}

const CandidateSendingNextLoader = ({ rows = 2 }: Props) => (
  <Container direction='column' flex justifyContent='center'>
    <Container top='medium' bottom='medium' flex justifyContent='center'>
      <SkeletonLoader.Header />
    </Container>

    <SkeletonLoader.Typography rows={rows} />
  </Container>
)

export default CandidateSendingNextLoader
