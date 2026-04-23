import { TimeZone } from '@staff-portal/graphql/staff'

export const getAvailableTimeZonesResponse = (
  availableTimeZones: TimeZone[] = []
) => ({
  data: {
    availableTimeZones
  }
})
