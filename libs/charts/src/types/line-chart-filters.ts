import { LineChartLevel } from './line-chart-level'
import { LineChartPeriod } from './line-chart-period'

export interface LineChartFilters {
  period?: LineChartPeriod
  realKpiValue?: boolean
  level?: LineChartLevel
}
