import {
  DEFAULT_ISO_DATE_FORMAT,
  parseAndFormatDate
} from '@staff-portal/date-time-utils'
import { asQueryParam } from '@staff-portal/query-params-state'

interface DateRange {
  from?: string
  till?: string
}

export const dateRangeQueryParam = asQueryParam({
  decode(dateRange: DateRange): DateRange {
    let from, till

    try {
      if (dateRange.from) {
        from = parseAndFormatDate(dateRange.from, {
          dateFormat: DEFAULT_ISO_DATE_FORMAT
        })
      }

      if (dateRange.till) {
        till = parseAndFormatDate(dateRange.till, {
          dateFormat: DEFAULT_ISO_DATE_FORMAT
        })
      }
      // eslint-disable-next-line no-empty
    } catch {}

    return { from, till }
  },
  encode: ({ from, till }: DateRange): DateRange => ({
    from: from?.toString(),
    till: till?.toString()
  })
})
