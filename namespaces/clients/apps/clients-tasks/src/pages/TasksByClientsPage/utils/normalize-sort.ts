import { QueryParams } from '@staff-portal/query-params-state'

export const normalizeSort = (values: QueryParams) => {
  const { sort_order, sort_target, sort, ...rest } = values

  if (sort_order && sort_target && !sort) {
    return { ...rest, sort: { order: sort_order, target: sort_target } }
  }

  if (sort) {
    return { ...rest, sort }
  }

  return rest
}
