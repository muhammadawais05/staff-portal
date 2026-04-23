import React from 'react'
import { DetailedListSkeleton } from '@staff-portal/ui'

import { LABEL_COLUMN_WIDTH } from '../../../../constants'

const EngagementSurveyItemSkeletonLoader = () => (
  <DetailedListSkeleton
    hasHalfWidthItems
    columns={1}
    labelColumnWidth={LABEL_COLUMN_WIDTH}
    items={10}
  />
)

export default EngagementSurveyItemSkeletonLoader
