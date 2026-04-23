import React, { useMemo, memo, FC } from 'react'
import { Form } from '@toptal/picasso-forms'
import { Container } from '@toptal/picasso'

import { LineChartPeriod, BarChartPeriod } from '../../types'
import * as S from './styles'

type PeriodValue = LineChartPeriod | BarChartPeriod

type ChartPeriodOption = {
  value: PeriodValue
  text: string
}

const PeriodLabels: Record<PeriodValue, string> = {
  [LineChartPeriod.LASTMONTH]: 'Last 30 days',
  [LineChartPeriod.LASTWEEK]: 'Last 7 days',
  [LineChartPeriod.LASTDAY]: 'Last 24 hours',
  [BarChartPeriod.LAST3DAYS]: 'Last 3 days',
  [BarChartPeriod.LASTMONTH]: 'Last 30 days',
  [BarChartPeriod.LASTWEEK]: 'Last 7 days'
}

interface Props {
  periods: PeriodValue[]
}

const PeriodSelect: FC<Props> = memo(({ periods }) => {
  const options = useMemo<ChartPeriodOption[]>(
    () =>
      periods.map(period => ({
        value: period,
        text: PeriodLabels[period]
      })),
    [periods]
  )

  return (
    <Container left='small' css={S.chartDropdown}>
      <Form.Select size='small' name='period' width='full' options={options} />
    </Container>
  )
})

export default PeriodSelect
