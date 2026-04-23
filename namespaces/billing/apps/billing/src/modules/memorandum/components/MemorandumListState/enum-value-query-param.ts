import { asQueryParam } from '@staff-portal/query-params-state'

/**
 * TODO : export to staff-portal
 *  https://toptal-core.atlassian.net/browse/SPB-1356
 */
export const EnumValueQueryParam = asQueryParam({
  decode: (key = ''): string => (key as string).toUpperCase(),
  encode: (key = ''): string => (key as string).toLowerCase()
})
