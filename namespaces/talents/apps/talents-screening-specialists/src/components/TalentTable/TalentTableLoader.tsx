import React from 'react'
import {
  TableSkeleton,
  TableSkeletonColumn,
  TableSkeletonType
} from '@staff-portal/ui'

import * as S from './styles'

const cols: TableSkeletonColumn[] = [
  {
    props: {
      css: S.cellFirst
    },
    skeletonType: TableSkeletonType.Media,
    skeletonProps: {
      variant: 'icon'
    }
  },
  {
    title: 'Rank',
    skeletonType: TableSkeletonType.Media,
    skeletonProps: {
      variant: 'icon',
      circle: true
    }
  },
  {
    title: 'Name',
    skeletonProps: {
      rows: 2
    }
  },
  {
    title: 'Assignee'
  },
  {
    title: 'Vertical',
    skeletonProps: {
      rows: 2
    }
  },
  {
    title: 'Current Step',
    skeletonProps: {
      rows: 2
    }
  },
  {
    title: 'Talent Status',
    skeletonProps: {
      rows: 2
    }
  },
  {},
  {
    title: 'TSS Status',
    props: {
      css: S.cellLast
    },
    skeletonType: TableSkeletonType.Media,
    skeletonProps: {
      variant: 'icon',
      circle: true
    }
  }
]

const TalentTableLoader = () => {
  return (
    <TableSkeleton
      rows={10}
      cols={cols}
      dataTestId='tss-talent-list'
      spacing='narrow'
    />
  )
}

export default TalentTableLoader
