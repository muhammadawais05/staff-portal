import {
  DEFAULT_ISO_DATE_FORMAT,
  parseAndFormatDate
} from '@staff-portal/date-time-utils'

interface TimeRange {
  from?: string
  till?: string
}

export const TimeRangeGqlParam = () => (value: unknown) => {
  const { from, till } = value as TimeRange

  return {
    ...(from && {
      from: parseAndFormatDate(from, { dateFormat: DEFAULT_ISO_DATE_FORMAT })
    }),
    ...(till && {
      till: parseAndFormatDate(till, { dateFormat: DEFAULT_ISO_DATE_FORMAT })
    })
  } as TimeRange
}
