import React from 'react'
import { AnalyticsChart, ChartTooltip } from '@staff-portal/charts'
import { Container, Typography, SkeletonLoader } from '@toptal/picasso'
import { palette } from '@toptal/picasso/utils'
import { parseAndFormatDateTime } from '@staff-portal/date-time-utils'

import { useGetTeamTaskMetricsChartData } from '../../data/get-team-metrics-charts'
import * as S from './styles'

const POLL_INTERVAL = 60_000

export interface Props {
  chartUrl: string
}

const lineConfig = {
  role: { color: palette.blue.main },
  team: { color: palette.yellow.main }
}

const MetricsChart = ({ chartUrl }: Props) => {
  const { data: metricsChartData, loading: metricsChartLoading } =
    useGetTeamTaskMetricsChartData(chartUrl, POLL_INTERVAL)

  if (metricsChartLoading) {
    return (
      <Container css={S.wrapper}>
        <SkeletonLoader.Header />
        <SkeletonLoader.Typography rows={12} />
      </Container>
    )
  }

  if (!metricsChartData) {
    return null
  }

  const { data, thresholds_dates, highlights, description, labels, units } =
    metricsChartData
  const referenceLines = [
    {
      data: thresholds_dates.red,
      color: palette.red.main
    },
    {
      data: thresholds_dates.green,
      color: palette.green.main
    },
    {
      data: thresholds_dates.orange,
      color: palette.yellow.main
    }
  ]

  const highlightsConfig = [
    {
      data: highlights,
      color: palette.blue.main
    }
  ]

  return (
    <Container css={S.wrapper}>
      <Typography
        size='medium'
        weight='semibold'
        color='black'
        noWrap
        titleCase
      >
        {description}
      </Typography>
      <div css={S.expandChart}>
        <AnalyticsChart
          tooltip
          customTooltip={
            <ChartTooltip
              values={data[0].values}
              labels={labels}
              units={units}
            />
          }
          allowTooltipEscapeViewBox
          xAxisKey='date'
          data={data}
          unit=''
          highlights={highlightsConfig}
          referenceLines={referenceLines}
          lineConfig={lineConfig}
          formatXAxisLabel={(label: string) =>
            parseAndFormatDateTime(label, { dateFormat: 'MMM dd' })
          }
          showBottomYAxisLabel
        />
      </div>
    </Container>
  )
}

export default MetricsChart
