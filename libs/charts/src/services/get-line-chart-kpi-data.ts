import { palette } from '@toptal/picasso/utils'

import { formatXAxisLabel } from './format-x-axis-label'
import { LineChartResponse, LineChartData } from '../types'
import getReferenceLines from './get-reference-lines'

export default (data: LineChartResponse): LineChartData => {
  const { id, values } = data.data[0]

  return {
    data: [{ id, values }],
    description: data.description,
    lineConfig: {
      [id]: { color: palette.blue.main }
    },
    labels: data.labels,
    granularity: data.granularity,
    unit: data.units[id],
    units: data.units,
    highlights: data.highlights,
    referenceLines: getReferenceLines(data),
    formatLabel: formatXAxisLabel(data.granularity)
  }
}
