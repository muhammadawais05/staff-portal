import {
  gql,
  useQuery,
  ANALYTICS_CONTEXT
} from '@staff-portal/data-layer-service'

import { BarChartResponse } from '../../types'

const GET_BAR_CHART = gql`
  query GetBarChart($chartPath: string) {
    barChart(chartPath: $chartPath)
      @rest(type: "BarChart", method: "GET", path: "{args.chartPath}") {
      data
      labels
      tooltips
      units
      x_axis_type
      auth_path
    }
  }
`

// We want to refetch every 60 seconds
const POLL_INTERVAL = 60_000

export const useGetBarChartData = ({ chartPath }: { chartPath: string }) => {
  const { data, error, loading, stopPolling, refetch } = useQuery<{
    barChart: BarChartResponse
  }>(GET_BAR_CHART, {
    variables: { chartPath },
    context: { type: ANALYTICS_CONTEXT },
    pollInterval: POLL_INTERVAL,
    onError: queryError => {
      if (queryError.networkError) {
        stopPolling()
      }
    }
  })

  return { chartData: data?.barChart, loading, error, refetch }
}
