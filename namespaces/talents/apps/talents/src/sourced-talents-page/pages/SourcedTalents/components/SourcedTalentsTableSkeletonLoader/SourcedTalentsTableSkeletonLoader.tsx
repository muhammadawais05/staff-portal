import React from 'react'
import {
  TableSkeleton,
  TableSkeletonColumn,
  TableSkeletonType
} from '@staff-portal/ui'

const cols: TableSkeletonColumn[] = [
  {
    title: 'Name',
    skeletonType: TableSkeletonType.Media,
    skeletonProps: {
      size: 'xsmall'
    }
  },
  {
    key: 'name-besides-avatar',
    skeletonType: TableSkeletonType.Typography
  },
  {
    title: 'Applied'
  },
  {
    title: 'Role'
  },
  {
    title: 'Status'
  },
  {
    title: 'Next Meeting'
  }
]
const SourcedTalentsTableSkeletonLoader = () => (
  <TableSkeleton
    dataTestId='SourcedTalentsTable-skeleton-loader'
    rows={10}
    cols={cols}
  />
)

export default SourcedTalentsTableSkeletonLoader
