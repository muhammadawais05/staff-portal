import { JobHoursOverlap } from '@staff-portal/graphql/staff'

const JOB_HOURS_OVERLAP_MAPPING: Record<JobHoursOverlap, number> = {
  [JobHoursOverlap.HOUR_1]: 1,
  [JobHoursOverlap.HOUR_2]: 2,
  [JobHoursOverlap.HOUR_3]: 3,
  [JobHoursOverlap.HOUR_4]: 4,
  [JobHoursOverlap.HOUR_5]: 5,
  [JobHoursOverlap.HOUR_6]: 6,
  [JobHoursOverlap.HOUR_7]: 7,
  [JobHoursOverlap.HOUR_8]: 8,
  [JobHoursOverlap.HOUR_9]: 9,
  [JobHoursOverlap.HOUR_10]: 10,
  [JobHoursOverlap.HOUR_11]: 11,
  [JobHoursOverlap.HOUR_12]: 12
}

export const formatJobTimezone = (
  timeZoneName?: string | null,
  hoursOverlap?: JobHoursOverlap | null
) => {
  if (!timeZoneName) {
    return null
  }

  if (!hoursOverlap) {
    return timeZoneName
  }

  const hoursOverlapNumber = JOB_HOURS_OVERLAP_MAPPING[hoursOverlap]

  const overlapInfo = `min ${hoursOverlapNumber} ${
    hoursOverlapNumber > 1 ? 'hours' : 'hour'
  } overlap`

  return `${timeZoneName}, ${overlapInfo}`
}
