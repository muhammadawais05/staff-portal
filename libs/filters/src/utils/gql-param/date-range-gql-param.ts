import {
  DEFAULT_ISO_DATE_FORMAT,
  parseAndFormatDate
} from '@staff-portal/date-time-utils'
import { Scalars } from '@staff-portal/graphql/staff'

interface DateRange {
  from?: Scalars['Date']
  till?: Scalars['Date']
}

export const DateRangeGqlParam = () => (value: unknown) => {
  const { from, till } = value as DateRange

  return {
    ...(from && {
      from: parseAndFormatDate(from, { dateFormat: DEFAULT_ISO_DATE_FORMAT })
    }),
    ...(till && {
      till: parseAndFormatDate(till, { dateFormat: DEFAULT_ISO_DATE_FORMAT })
    })
  } as DateRange
}
