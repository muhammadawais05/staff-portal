import { asQueryParam } from '@staff-portal/query-params-state'

export const singleEnumQueryParam = asQueryParam({
  decode: (key: string): string => key.toUpperCase(),
  encode: (key: string): string => key.toLowerCase()
})
