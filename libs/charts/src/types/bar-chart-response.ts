import { DataItem as BarChartItem } from '@topkit/analytics-charts'

export type BarChartResponse = {
  data: BarChartItem[]
  tooltips: Record<string, Record<string, Record<string, string>>>
  labels: Record<string, string>
  units: Record<string, string>
  x_axis_type: string
  auth_path?: string
}
