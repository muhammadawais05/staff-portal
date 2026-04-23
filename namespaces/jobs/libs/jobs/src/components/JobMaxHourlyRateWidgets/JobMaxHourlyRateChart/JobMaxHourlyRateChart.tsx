import React, { useMemo } from 'react'
import { BarChart } from '@staff-portal/charts'
import { AggregatedTalentClientHourlyRatesItem } from '@staff-portal/graphql/staff'
import { palette } from '@toptal/picasso/utils'

import { getChartData } from './utils/get-chart-data'
import { HourlyRateRange, inRange } from '../utils/inRange'

interface Props {
  maxHourlyRate?: HourlyRateRange
  rates?: AggregatedTalentClientHourlyRatesItem[]
}

export const JobMaxHourlyRateChart = ({ maxHourlyRate, rates = [] }: Props) => {
  const data = useMemo(() => getChartData(rates), [rates])
  const chartData = [
    {
      name: '',
      value: data.chartValues
    }
  ]

  return (
    <BarChart
      data={chartData}
      getBarColor={({ dataKey }) => {
        if (!maxHourlyRate) {
          return palette.grey.main
        }

        return inRange(parseInt(dataKey), maxHourlyRate)
          ? palette.blue.main
          : palette.grey.main
      }}
      width={540}
      showBarLabel={false}
      data-testid='JobMaxHourlyRateChart'
    />
  )
}

export default JobMaxHourlyRateChart
