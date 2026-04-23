import React from 'react'
import { Grid, Typography } from '@toptal/picasso'

import { MetricsData } from '../../data/get-team-task-metrics/types'
import * as S from './styles'
import { getCounterWeight } from '../../utils'

export interface Props {
  label: string
  item: MetricsData
}

const MetricsRow = ({ label, item }: Props) => {
  const { count, ratio, isAbove, isBelow } = item
  const color = isAbove ? 'red' : isBelow ? 'green' : undefined

  const countWeight = getCounterWeight(count)
  const ratioWeight = getCounterWeight(ratio)

  return (
    <Grid spacing={0} css={S.row}>
      <Grid.Item small={6}>
        <Typography size='medium' align='left'>
          {label}
        </Typography>
      </Grid.Item>
      <Grid.Item small={3}>
        <Typography
          color={color}
          size='medium'
          weight={countWeight}
          align='right'
        >
          {count}
        </Typography>
      </Grid.Item>
      <Grid.Item small={3}>
        <Typography size='medium' weight={ratioWeight} align='right'>
          {ratio}
        </Typography>
      </Grid.Item>
    </Grid>
  )
}

export default MetricsRow
