import { ChartValues } from './chart-values'

export type LineChartResponse = {
  data: { id: string; values: ChartValues }[]
  labels: Record<string, string>
  units: Record<string, string>
  x_axis_type: string
  granularity: 'hour' | 'day'
  timezone_label: string
  thresholds_dates: Record<string, Record<string, number>>
  highlights: string[]
  description: string
}
