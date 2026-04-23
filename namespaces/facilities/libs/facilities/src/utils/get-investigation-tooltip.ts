import { parseAndFormatDate } from '@staff-portal/date-time-utils'

export const getInvestigationTooltip = (date: string) => {
  const investigationDate = parseAndFormatDate(date)

  return `Investigation since ${investigationDate}`
}
