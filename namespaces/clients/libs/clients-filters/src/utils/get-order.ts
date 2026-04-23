import {
  getSortBy,
  SingleEnumToGqlParam,
  Sort,
  SortOrder
} from '@staff-portal/filters'
import {
  ClientSearchOrderField,
  OrderDirection
} from '@staff-portal/graphql/staff'
import { QueryParams } from '@staff-portal/query-params-state'

export const getOrder = (filterValues: QueryParams) => {
  const { order, target } = getSortBy(
    filterValues?.sort as Sort | undefined,
    SortOrder.DESC,
    ClientSearchOrderField.CREATED_AT
  )

  return {
    field:
      SingleEnumToGqlParam(ClientSearchOrderField)(target) ??
      ClientSearchOrderField.CREATED_AT,
    direction: SingleEnumToGqlParam(OrderDirection)(order) ?? OrderDirection.ASC
  }
}
