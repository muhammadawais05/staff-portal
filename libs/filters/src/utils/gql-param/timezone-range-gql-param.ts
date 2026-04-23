import { TIMEZONE_FILTER_MAX, TIMEZONE_FILTER_MIN } from '@staff-portal/config'
import { TimezoneRangeFilter } from '@staff-portal/graphql/staff'

interface Range {
  from?: number
  to?: number
}

export const TimeZoneRangeGqlParam =
  () =>
  (value: unknown): TimezoneRangeFilter | undefined => {
    const { from, to } = value as Range

    if (typeof to !== 'number' && typeof from !== 'number') {
      return undefined
    }

    return {
      from: (typeof from === 'number' ? from : TIMEZONE_FILTER_MIN).toString(),
      to: (typeof to === 'number' ? to : TIMEZONE_FILTER_MAX).toString()
    }
  }
