import { Maybe } from '@staff-portal/graphql/staff'

import { DEFAULT_TIME_FORMAT } from './constants'
import formatDate from './format-date'
import { TimeZoneFragment } from './data'

export const getTimeZoneText = (timeZone?: Maybe<TimeZoneFragment>) => {
  if (!timeZone) {
    return
  }

  const now = new Date()
  const offset = formatDate(now, {
    dateFormat: 'xxx',
    timeZone: timeZone.value
  })
  const time = formatDate(now, {
    dateFormat: DEFAULT_TIME_FORMAT,
    timeZone: timeZone.value
  })

  return `(UTC${offset}) - Now: ${time}`
}
