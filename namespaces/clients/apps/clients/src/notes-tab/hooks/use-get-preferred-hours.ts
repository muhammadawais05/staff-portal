import { useGetAvailableTimeZones } from '@staff-portal/date-time-utils'
import { JobHoursOverlap } from '@staff-portal/graphql/staff'
import { formatJobTimezone } from '@staff-portal/jobs'
import { useMemo } from 'react'

export interface Props {
  timeZoneName?: string | null
  hoursOverlap?: JobHoursOverlap | null
}

export const useGetPreferredHours = ({ hoursOverlap, timeZoneName }: Props) => {
  const { timezones } = useGetAvailableTimeZones()

  const timeZoneLabel = useMemo(
    () =>
      timezones?.find(timeZone => timeZone.value === timeZoneName)?.name ||
      timeZoneName,
    [timezones, timeZoneName]
  )

  return formatJobTimezone(timeZoneLabel, hoursOverlap)
}
