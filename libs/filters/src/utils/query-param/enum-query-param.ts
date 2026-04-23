import { asQueryParam } from '@staff-portal/query-params-state'

export const enumQueryParam = asQueryParam({
  decode: (keys: string[] = []): string[] => keys.map(key => key.toUpperCase()),
  encode: (keys: string[] = []): string[] => keys.map(key => key.toLowerCase())
})
