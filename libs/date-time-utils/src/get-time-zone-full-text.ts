import { NO_VALUE } from '@staff-portal/config'

import { TimeZoneFragment } from './data'
import { parseAndFormatDateTime } from './parse-and-format-date'

const getTimeZoneFullText = (timeZone?: TimeZoneFragment | null) => {
  if (!timeZone) {
    return NO_VALUE
  }

  return `${timeZone.name}, now ${parseAndFormatDateTime(
    // eslint-disable-next-line @miovision/disallow-date/no-new-date
    new Date().toISOString(),
    {
      dateFormat: 'h:mm a',
      timeZone: timeZone.value
    }
  )}`
}

export default getTimeZoneFullText
