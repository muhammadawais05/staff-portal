export const MAX_DATE = new Date(9999, 11, 31)
export const WEEK_STARTS_ON = 0 // Index of the first day of the week (0 - Sunday)
export const DEFAULT_DATE_FORMAT = `MMM d, yyyy`
export const FULL_MONTH_DATE_FORMAT = `MMMM d, yyyy`
export const DEFAULT_TIME_FORMAT = `h:mm a`
export const DEFAULT_FULL_DATE_FORMAT = `${DEFAULT_DATE_FORMAT} 'at' ${DEFAULT_TIME_FORMAT}`
// TODO: There is bug in date-fns-tz. It is not possible to use ('UTC' xxx) without a space.
// But we don't need a space. Should be fixed with --staff-portal-date TF
export const DEFAULT_FULL_DATE_FORMAT_WITH_TIMEZONE = `${DEFAULT_FULL_DATE_FORMAT} ('UTC' xxx)`
export const DEFAULT_ISO_DATE_FORMAT = 'yyyy-MM-dd'
export const DEFAULT_ISO_DATE_PLACEHOLDER = 'yyyy-mm-dd'
export const DEFAULT_ISO_DATE_TIME_FORMAT = "yyyy-MM-dd'T'HH:mm:ssxxx"
export const FULL_MONTH_YEAR_FORMAT = 'MMMM yyyy'
