import {
  addDays,
  DEFAULT_ISO_DATE_FORMAT,
  formatDate
} from '@staff-portal/date-time-utils'

// eslint-disable-next-line @miovision/disallow-date/no-new-date
export const daysFromNow = (days: number) =>
  formatDate(addDays(new Date(), days), {
    dateFormat: DEFAULT_ISO_DATE_FORMAT
  })
