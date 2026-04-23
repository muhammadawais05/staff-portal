import { TableSkeletonColumn, TableSkeletonType } from '@staff-portal/ui'

import * as S from './containers/TalentSoftSkillsSection/styles'

export const skeletonCols: TableSkeletonColumn[] = [
  {
    title: 'Skill'
  },
  {
    title: 'Rating',
    props: {
      css: S.skeletonRatingCell
    }
  },
  {
    title: 'Number of Ratings',
    props: {
      css: S.skeletonNumberOfRatingsCell
    }
  },
  {
    title: 'Actions',
    skeletonType: TableSkeletonType.Button,
    skeletonProps: {
      size: 'small'
    },
    props: {
      css: S.skeletonButtonsCell
    }
  }
]
