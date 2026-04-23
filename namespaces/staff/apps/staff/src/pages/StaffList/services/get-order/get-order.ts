import {
  getSortBy,
  SingleEnumToGqlParam,
  Sort,
  SortOrder
} from '@staff-portal/filters'
import { StaffOrderField, OrderDirection } from '@staff-portal/graphql/staff'
import { QueryParams } from '@staff-portal/query-params-state'

const getOrder = (filterValues: QueryParams) => {
  const { order, target } = getSortBy(
    filterValues?.sort as Sort | undefined,
    SortOrder.DESC,
    StaffOrderField.CREATED_AT
  )

  return {
    field:
      SingleEnumToGqlParam(StaffOrderField)(target) ??
      StaffOrderField.CREATED_AT,
    direction: SingleEnumToGqlParam(OrderDirection)(order) ?? OrderDirection.ASC
  }
}

export default getOrder
