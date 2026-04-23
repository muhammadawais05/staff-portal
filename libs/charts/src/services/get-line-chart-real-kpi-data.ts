import { palette } from '@toptal/picasso/utils'

import { formatXAxisLabel } from './format-x-axis-label'
import { LineChartResponse, LineChartData } from '../types'
import getReferenceLines from './get-reference-lines'

export default (
  data: LineChartResponse,
  realKpiData: LineChartResponse
): LineChartData => {
  const { id, values } = data.data[0]

  return {
    data: [
      { id, values },
      {
        id: 'realKpi',
        values: realKpiData.data[0].values
      }
    ],
    description: data.description,
    lineConfig: {
      [id]: { color: palette.blue.main },
      realKpi: { color: palette.grey.main2 }
    },
    labels: {
      [id]: data.labels[id],
      realKpi: `${realKpiData.labels[id]} (real KPI values)`
    },
    granularity: data.granularity,
    unit: data.units[id],
    units: {
      [id]: data.units[id],
      realKpi: realKpiData.units[id]
    },
    highlights: data.highlights,
    referenceLines: getReferenceLines(data),
    formatLabel: formatXAxisLabel(data.granularity)
  }
}
