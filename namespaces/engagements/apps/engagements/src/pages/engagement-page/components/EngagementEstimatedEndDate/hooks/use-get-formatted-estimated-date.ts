import { DEFAULT_DATE_FORMAT, parseAndFormatDate } from '@staff-portal/date-time-utils'

const useGetFormattedEstimatedDate = (date: string | null | undefined) => {
  return date
    ? parseAndFormatDate(date, { dateFormat: DEFAULT_DATE_FORMAT })
    : 'Not specified'
}

export default useGetFormattedEstimatedDate
