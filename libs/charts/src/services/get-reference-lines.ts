import { palette } from '@toptal/picasso/utils'

import { LineChartResponse } from '../types'

export default (data: LineChartResponse) => [
  { data: data.thresholds_dates.red, color: palette.red.main },
  { data: data.thresholds_dates.orange, color: palette.yellow.main },
  { data: data.thresholds_dates.green, color: palette.green.main }
]
