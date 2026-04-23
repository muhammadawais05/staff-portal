export interface MetricsData {
  count: number
  ratio: number
  isAbove: boolean
  isBelow: boolean
}

export interface MetricsResult {
  label: string
  overdue: MetricsData
  today: MetricsData
  pending: MetricsData
  chartUrl: string
}
