import { format, parseISO, addMinutes } from '@staff-portal/date-time-utils'

import { LineChartGranularity } from '../types'

export const formatXAxisLabel =
  (granularity: LineChartGranularity) => (label: string) =>
    granularity === 'hour'
      ? format(addMinutes(parseISO(label), 1), 'h a').toUpperCase()
      : format(parseISO(label), 'MMM dd')
