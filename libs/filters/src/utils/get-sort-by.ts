import { SortOrderEnum } from '@staff-portal/graphql/staff'

import { SortOrder, Sort } from '../types'

const getOrder = (order: SortOrder): SortOrderEnum =>
  order === SortOrder.ASC ? SortOrderEnum.ASC : SortOrderEnum.DESC

export const getSortBy = (
  sort: Sort | undefined,
  defaultSortOrder: SortOrder,
  defaultSortTarget: string
): {
  order: SortOrderEnum
  target: string
} => {
  if (!sort) {
    return { order: getOrder(defaultSortOrder), target: defaultSortTarget }
  }

  return { order: getOrder(sort.order), target: sort.target }
}
