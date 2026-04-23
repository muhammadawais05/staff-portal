import { TimeSlotsPerDay } from '@staff-portal/graphql/staff'

export const getTotalOverlapping = (
  talentCalendarAvailability: TimeSlotsPerDay[]
) =>
  talentCalendarAvailability.reduce(
    (total, { slotsCount }) => total + slotsCount,
    0
  )
