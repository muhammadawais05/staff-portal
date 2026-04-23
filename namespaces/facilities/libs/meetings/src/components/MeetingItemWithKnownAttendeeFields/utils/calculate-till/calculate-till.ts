import { addMinutes } from '@staff-portal/date-time-utils'
import { Scalars } from '@staff-portal/graphql/staff'

export const calculateTill = (
  scheduledAt: string,
  durationMinutes: number
): Scalars['Time'] =>
  addMinutes(
    // eslint-disable-next-line @miovision/disallow-date/no-new-date
    new Date(scheduledAt),
    durationMinutes
  ).toISOString()
