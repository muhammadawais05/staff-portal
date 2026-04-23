import React from 'react'
import { Container } from '@toptal/picasso'
import { TableSkeleton } from '@staff-portal/ui'
import { skeletonCols } from '@staff-portal/talents-soft-skills'

import MatchQualitySkeletonLoader from '../MatchQualitySkeletonLoader/MatchQualitySkeletonLoader'

const QualityRatingsSectionSkeletonLoader = () => (
  <Container>
    <MatchQualitySkeletonLoader />
    <TableSkeleton rows={3} cols={skeletonCols} />
  </Container>
)

export default QualityRatingsSectionSkeletonLoader
