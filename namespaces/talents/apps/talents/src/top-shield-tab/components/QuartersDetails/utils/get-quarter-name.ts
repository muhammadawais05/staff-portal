import { isAfter, isBefore } from '@staff-portal/date-time-utils'
import { TopShieldApplicationQuarterFragment } from '@staff-portal/talents-top-shield'

export const getQuarterName = (
  quarter: TopShieldApplicationQuarterFragment
) => {
  if (!quarter.startDate || !quarter.endDate) {
    return
  }

  const current = new Date()
  const startDate = new Date(quarter.startDate)
  const endDate = new Date(quarter.endDate)

  if (isBefore(current, startDate)) {
    return 'Future Quarters Group'
  } else if (isAfter(current, endDate)) {
    return 'Archived Quarters Group'
  }

  return 'Current Quarter Group'
}
