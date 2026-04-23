import type { TableSkeletonColumn } from '@staff-portal/ui'

import * as TableStyles from './styles'

export const tableCols: TableSkeletonColumn[] = [
  {
    title: 'Talent',
    props: {
      css: TableStyles.talentCol
    }
  },
  {
    title: 'Talent Rate',
    props: {
      css: TableStyles.talentRateCol
    }
  },
  {
    title: 'Bill Rate',
    props: {
      css: TableStyles.billRateCol
    }
  },
  {
    title: 'Intro Status',
    props: {
      css: TableStyles.introStatusCol
    }
  },
  {
    title: 'Actions',
    props: {
      css: TableStyles.actionsCol
    }
  }
]

export const emptyHourlyRate = '0'
