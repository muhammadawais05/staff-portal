import { createHoursMinutesLabel } from '@staff-portal/date-time-utils'

export const formatWorkingHours = (
  workingTimeFrom?: string | null,
  workingTimeTo?: string | null
) => {
  if (!workingTimeFrom || !workingTimeTo) {
    return null
  }

  const workingTimeFromParts = workingTimeFrom.split(':')
  const workingTimeToParts = workingTimeTo.split(':')

  const fromLabel = createHoursMinutesLabel(
    parseInt(workingTimeFromParts[0]),
    parseInt(workingTimeFromParts[1])
  )
  const toLabel = createHoursMinutesLabel(
    parseInt(workingTimeToParts[0]),
    parseInt(workingTimeToParts[1])
  )

  return `${fromLabel} to ${toLabel}`
}
