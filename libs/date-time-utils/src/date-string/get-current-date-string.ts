import getDateString from './get-date-string'

// eslint-disable-next-line @miovision/disallow-date/no-new-date
const getCurrentDateString = (params: { timeZone?: string } = {}) =>
  getDateString(new Date(), params)

export default getCurrentDateString
