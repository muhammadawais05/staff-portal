import { Payload } from '../../ChartTooltip'

const HOUR = 60
const DAY = HOUR * 24

const formatMinutes = (minutes: number) => {
  let value = minutes
  const parts = []

  if (value >= DAY * 2) {
    parts.push(Math.floor(value / DAY) + 'd')
    value %= DAY
  }

  if (value >= HOUR || parts.length > 0) {
    parts.push(Math.floor(value / HOUR) + 'h')
    value %= HOUR
  }

  parts.push(Math.floor(value) + 'm')

  return parts.join(' ')
}

const formatPercents = (percents: number) => `${percents}%`

export const formatValue = (
  { name, value, payload }: Payload,
  units: string
) => {
  if (payload[`${name}IsEmpty`]) {
    return 'No data'
  }

  if (units === 'minutes') {
    return formatMinutes(value)
  }

  if (units === 'percent') {
    return formatPercents(value)
  }

  // TODO: additional logic to handle different units
  // https://github.com/toptal/platform/blob/master/app/assets/features/platform/analytics/js/components/charts/views/date_chart.js#L266
  return `${value} ${units}`
}
