import { isFuture } from 'date-fns'
import { zonedTimeToUtc } from 'date-fns-tz'

const isFutureZonedTime = ({
  date,
  timeZone
}: {
  date: string
  timeZone: string
}) => isFuture(zonedTimeToUtc(date, timeZone))

export default isFutureZonedTime
