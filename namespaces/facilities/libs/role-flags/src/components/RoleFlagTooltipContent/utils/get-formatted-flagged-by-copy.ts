import {
  parseAndFormatDate,
  isBefore,
  parseISO
} from '@staff-portal/date-time-utils'

type TimeParams = {
  createdAt: string
  updatedAt: string
  timeZone?: string
}

const getFormattedFlaggedByCopy = (
  { createdAt, updatedAt, timeZone }: TimeParams,
  fullName?: string
) => {
  const verb = isBefore(parseISO(createdAt), parseISO(updatedAt))
    ? 'Updated'
    : 'Added'

  return `${verb} by ${fullName || 'System'} on ${parseAndFormatDate(
    updatedAt,
    { timeZone }
  )}`
}

export default getFormattedFlaggedByCopy
