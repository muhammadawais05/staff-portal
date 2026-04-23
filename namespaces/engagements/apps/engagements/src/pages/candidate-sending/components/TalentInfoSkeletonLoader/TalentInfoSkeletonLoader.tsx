import React from 'react'
import { DetailedListSkeleton } from '@staff-portal/ui'

import { LABEL_COLUMN_EXPANDED_SECTION_WIDTH } from '../../constants'

export const TalentInfoSkeletonLoader = () => (
  <DetailedListSkeleton
    labelColumnWidth={LABEL_COLUMN_EXPANDED_SECTION_WIDTH}
    columns={1}
    items={4}
  />
)
