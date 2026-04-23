import getLineChartKpiData from './get-line-chart-kpi-data'
import getLineChartRealKpiData from './get-line-chart-real-kpi-data'
import { LineChartResponse, LineChartData } from '../types'

export default ({
  data,
  realKpiData,
  showRealKpi
}: {
  data?: LineChartResponse
  realKpiData?: LineChartResponse
  showRealKpi?: boolean
}): LineChartData | undefined => {
  if (showRealKpi) {
    if (!data || !realKpiData) {
      return
    }

    return getLineChartRealKpiData(data, realKpiData)
  }

  if (!data) {
    return
  }

  return getLineChartKpiData(data)
}
