import { getTimeZoneText } from '@staff-portal/date-time-utils'

import { JobFragment } from '../../data'

export const getTimeZonePreference = (
  timeZonePreference: JobFragment['timeZonePreference'],
  hasPreferredHours: JobFragment['hasPreferredHours'],
  hoursOverlap: JobFragment['hoursOverlap']
) => {
  if (!hasPreferredHours || !timeZonePreference) {
    return 'No preference'
  }

  if (hoursOverlap) {
    const hoursForm = hoursOverlap > 1 ? 'hours' : 'hour'
    const overlapPreference = `min ${hoursOverlap} ${hoursForm} overlap`

    return `${getTimeZoneText(timeZonePreference)}, ${overlapPreference}`
  }

  return getTimeZoneText(timeZonePreference)
}
