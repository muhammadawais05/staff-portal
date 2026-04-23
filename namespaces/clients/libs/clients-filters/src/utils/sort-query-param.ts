import { asQueryParam } from '@staff-portal/query-params-state'

export const sortQueryParam = asQueryParam({
  decode: ({ target, order }: { target: string; order: string }) => ({
    target: target.toUpperCase(),
    order
  }),
  encode: ({ target, order }: { target: string; order: string }) => ({
    target: target.toLowerCase(),
    order
  })
})
