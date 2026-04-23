import {
  JobOrder,
  JobOrderField,
  OrderDirection
} from '@staff-portal/graphql/staff'
import { Sort } from '@staff-portal/filters'

export const getOrder = (
  sort: Sort | undefined,
  defaultOrder: JobOrder
): JobOrder => {
  if (!sort) {
    return defaultOrder
  }

  // Handles the case where the sort query params are malformed
  if (!('target' in sort) || !('order' in sort)) {
    return defaultOrder
  }

  return {
    field: sort.target.toUpperCase() as JobOrderField,
    direction: sort.order.toUpperCase() as OrderDirection
  }
}
