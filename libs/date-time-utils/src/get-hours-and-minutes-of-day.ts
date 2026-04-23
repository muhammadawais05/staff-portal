import { format } from 'date-fns'

import { DEFAULT_TIME_FORMAT } from './constants'

const ONE_HOUR = 60
const HOURS = Array.from({ length: 24 }, (_, index) => index)

export const createHoursMinutesLabel = (hour: number, minute: number) => {
  // eslint-disable-next-line @miovision/disallow-date/no-new-date
  const date = new Date()

  date.setHours(hour, minute)

  return format(date, DEFAULT_TIME_FORMAT)
}

const defaultValueGetter = (hour: number, minute: number) => {
  const minutesWithleadingZero = minute === 0 ? '00' : minute
  const hourWithLeadingZero = hour < 10 ? `0${hour}` : hour

  return `${hourWithLeadingZero}:${minutesWithleadingZero}:00`
}

export const getHoursAndMinutesOfDay = ({
  hourlyInterval,
  valueGetter = defaultValueGetter
}: {
  hourlyInterval: number
  valueGetter?: (hour: number, minute: number) => string
}) => {
  const minutesFromInterval = Array.from(
    { length: hourlyInterval },
    (_, index) => (index * ONE_HOUR) / hourlyInterval
  )

  return HOURS.map(hour =>
    minutesFromInterval.map(minute => {
      return {
        text: createHoursMinutesLabel(hour, minute),
        value: valueGetter(hour, minute)
      }
    })
  ).flat()
}
