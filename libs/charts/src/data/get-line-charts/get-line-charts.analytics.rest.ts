import { useMemo } from 'react'
import {
  addQueryParams,
  getQueryParams,
  queryStringToObject
} from '@staff-portal/navigation'
import { gql, KIPPER_CONTEXT, useQuery } from '@staff-portal/data-layer-service'

import { LineChartResponse } from '../../types'
import { getLineChartData } from '../../services'

const GET_LINE_CHART = gql`
  query GetLineChart($chartPath: string) {
    lineChart(chartPath: $chartPath)
      @rest(type: "LineChart", method: "GET", path: "{args.chartPath}") {
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

const POLL_INTERVAL = 60_000

export const useGetLineChartData = ({
  chartPath: path,
  realKpi,
  showRealKpi
}: {
  chartPath: string
  realKpi: boolean
  showRealKpi: boolean
}) => {
  const chartPath = useMemo(
    () =>
      addQueryParams(path, {
        real_kpi_value: realKpi
      }),
    [path, realKpi]
  )

  const { data, error, loading, stopPolling } = useQuery<{
    lineChart: LineChartResponse
  }>(GET_LINE_CHART, {
    variables: { chartPath },
    context: { type: KIPPER_CONTEXT },
    skip: realKpi && !showRealKpi,
    pollInterval: POLL_INTERVAL,
    onError: err => {
      if (err.networkError) {
        stopPolling()
      }
    }
  })

  return { data, loading, error }
}

export const useGetLineChartsData = ({ chartPath }: { chartPath: string }) => {
  const query = queryStringToObject(getQueryParams(chartPath))
  const showRealKpi = query.real_kpi_value === 'true'

  const { data, error, loading } = useGetLineChartData({
    chartPath,
    realKpi: false,
    showRealKpi
  })

  const {
    data: realKpiData,
    error: realKpiError,
    loading: realKpiLoading
  } = useGetLineChartData({
    chartPath,
    realKpi: true,
    showRealKpi
  })

  const chartData =
    showRealKpi && realKpiData?.lineChart
      ? getLineChartData({
          data: data?.lineChart,
          realKpiData: realKpiData?.lineChart,
          showRealKpi
        })
      : getLineChartData({ data: data?.lineChart })

  return {
    chartData,
    error: error || realKpiError,
    loading: loading || (showRealKpi && realKpiLoading)
  }
}
