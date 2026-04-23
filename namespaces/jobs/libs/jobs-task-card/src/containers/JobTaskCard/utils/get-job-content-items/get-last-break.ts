import {
  isAfter,
  parseAndFormatDate,
  parseISO
} from '@staff-portal/date-time-utils'

import { JobBreaksFragment } from '../../data'

export const getLastBreak = (
  breaks: JobBreaksFragment['breaks'],
  timeZone?: string
) => {
  const engagementBreaks = breaks?.nodes
    ?.flatMap(item => item.engagementBreaks?.nodes)
    .filter((item): item is NonNullable<typeof item> => !!item)

  if (!engagementBreaks?.length) {
    return
  }

  const lastBreak = engagementBreaks.reduce((previousBreak, currentBreak) =>
    isAfter(parseISO(currentBreak.startDate), parseISO(previousBreak.startDate))
      ? currentBreak
      : previousBreak
  )

  const { startDate, endDate } = lastBreak
  const dateFrom = parseAndFormatDate(startDate, { timeZone })

  if (startDate === endDate) {
    return `On ${dateFrom}`
  }

  const dateTo = endDate ? parseAndFormatDate(endDate) : 'undefined date'

  return `${dateFrom} - ${dateTo}`
}
