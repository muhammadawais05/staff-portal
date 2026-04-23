import getDateTimeString from './get-date-time-string'
import getStartOfDayDateTimeString from './get-start-of-day-date-time-string'

const getStartOfCurrentDayDateTimeString = (params: { timeZone: string }) => {
  // eslint-disable-next-line @miovision/disallow-date/no-new-date
  const dateTimeString = getDateTimeString(new Date(), params)

  return getStartOfDayDateTimeString(dateTimeString)
}

export default getStartOfCurrentDayDateTimeString
