import { parseISO } from 'date-fns'

const TIMEZONE_REGEXP = /[+-]\d{2}:\d{2}/ // ex. +08:00, -01:00, +00:00

const getDateWithoutTimezone = (dateString: string) => {
  const timeZone = dateString.match(TIMEZONE_REGEXP)

  if (!timeZone || !timeZone[0]) {
    return parseISO(dateString)
  }

  return parseISO(dateString.replace(timeZone[0], ''))
}

export default getDateWithoutTimezone
