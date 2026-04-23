import { Range } from '@staff-portal/graphql/staff'
import { asQueryParam } from '@staff-portal/query-params-state'

export interface EncodedRange {
  from?: string
  to?: string
}

export const rangeQueryParam = asQueryParam({
  decode: ({ from, to }: EncodedRange) =>
    ({
      ...(typeof from === 'string' ? { from: Number(from) } : undefined),
      ...(typeof to === 'string' ? { to: Number(to) } : undefined)
    } as Range),
  encode: ({ from, to }: Range) => ({
    from: from?.toString(),
    to: to?.toString()
  })
})
