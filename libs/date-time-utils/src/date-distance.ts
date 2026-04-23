import { parseISO, differenceInMinutes } from 'date-fns'

import getDurationText from './get-duration-text'

const dateDistance = (start: string, end: string) => {
  const startDate = parseISO(start)
  const endDate = parseISO(end)
  const distanceInMinutes = Math.abs(differenceInMinutes(startDate, endDate))
  const totalHours = distanceInMinutes / 60
  const hours = Math.floor(totalHours)
  const totalMinutes = (totalHours - hours) * 60
  const minutes = Math.round(totalMinutes)

  return getDurationText(hours, minutes)
}

export default dateDistance
