import { useMemo } from 'react'
import { addQueryParams } from '@staff-portal/navigation'
import { gql, useQuery, KIPPER_CONTEXT } from '@staff-portal/data-layer-service'
import { LineChartResponse } from '@staff-portal/charts'

export const GET_TEAM_TASK_METRICS_CHART = gql`
  query GetTeamTaskMetricsChart($chartPath: string) {
    taskTeamMetricsChart(chartPath: $chartPath)
      @rest(
        type: "TaskTeamMetricsChart"
        method: "GET"
        path: "{args.chartPath}"
      ) {
      data
      description
      granularity
      highlights
      labels
      thresholds_dates
      timezone_label
      units
      x_axis_type
    }
  }
`

export const useGetTeamTaskMetricsChartData = (
  chartUrl: string,
  pollInterval = 0
) => {
  const chartPath = useMemo(
    () =>
      addQueryParams(chartUrl, {
        period: 'lastweek'
      }),
    [chartUrl]
  )
  const { data, loading, error, stopPolling } = useQuery<{
    taskTeamMetricsChart: LineChartResponse
  }>(GET_TEAM_TASK_METRICS_CHART, {
    variables: { chartPath },
    context: { type: KIPPER_CONTEXT },
    pollInterval,
    onError: err => {
      if (err.networkError) {
        stopPolling()
      }
    }
  })

  return { data: data?.taskTeamMetricsChart, loading, error }
}
