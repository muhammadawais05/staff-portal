import { titleize } from '@staff-portal/string'

import { RoleTimeZoneFragment } from '../../../RelatedToTime/data/task-engaged-subject-fragment'
import { TimeZoneFragment } from '../../types'

interface TimeZoneData {
  name: string
  type: string
  timeZoneName?: string
}

export const getTimeZoneData = (item: TimeZoneFragment): TimeZoneData => {
  const { timeZone } = item

  if ('contact' in item) {
    return {
      name: item.contact?.fullName ?? '',
      type: 'Contact',
      timeZoneName: timeZone?.name
    }
  }

  const { fullName, type } = item as unknown as RoleTimeZoneFragment

  return {
    name: fullName,
    type: titleize(type, { splitter: /([A-Z][a-z]*)/g }),
    timeZoneName: timeZone?.name
  }
}
