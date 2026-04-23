import { LineConfig } from '@toptal/picasso-charts'

import { LineChartGranularity } from './line-chart-granularity'
import { LineChartResponse } from './line-chart-response'

export type LineChartData = {
  data: LineChartResponse['data']
  description: string
  lineConfig: LineConfig
  labels: Record<string, string>
  granularity: LineChartGranularity
  unit: string
  units: Record<string, string>
  highlights: string[]
  referenceLines: { data: Record<string, number>; color: string }[]
  formatLabel: (label: string) => string
}
