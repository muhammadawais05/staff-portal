import {
  DateRange,
  OrderDirection,
  RateChangeRequestFilter,
  RateChangeRequestOrderField,
  RateChangeRequestTypeEnum,
  RateChangeRequestStatus
} from '@staff-portal/graphql/staff'
import {
  DateRangeGqlParam,
  EnumToGqlParam,
  IdGqlParam,
  SingleEnumToGqlParam,
  SortOrder,
  Sort,
  getSortBy
} from '@staff-portal/filters'
import { QueryParams } from '@staff-portal/query-params-state'

import { GetRateChangeRequestListQueryVariables } from '../../../../data/get-rate-change-request-list'
import { DEFAULT_SORT } from '../../../../constants'

const getOrder = (filterValues: QueryParams) => {
  const { order, target } = getSortBy(
    filterValues.sort as Sort | undefined,
    SortOrder.DESC,
    DEFAULT_SORT
  )

  return {
    field:
      SingleEnumToGqlParam(RateChangeRequestOrderField)(target) ?? DEFAULT_SORT,
    direction:
      SingleEnumToGqlParam(OrderDirection)(order) ?? OrderDirection.DESC
  }
}
const paramsToFilter = (filterValues: QueryParams): RateChangeRequestFilter => {
  const { claimerId, requestType, statuses, talentName, submissionDate } =
    filterValues

  return {
    ...(claimerId
      ? {
          claimerId: IdGqlParam()(claimerId)
        }
      : {}),
    ...(talentName ? { talentName: talentName as string } : {}),
    ...(statuses
      ? {
          statuses: EnumToGqlParam(RateChangeRequestStatus)(
            statuses as string[]
          )
        }
      : {}),
    ...(requestType
      ? {
          requestType: EnumToGqlParam(RateChangeRequestTypeEnum)([
            requestType as string
          ])
        }
      : {}),
    ...(submissionDate
      ? {
          submissionDate: DateRangeGqlParam()(submissionDate as DateRange)
        }
      : {})
  }
}

export const createGqlFilterVariables = (
  filterValues: QueryParams,
  pagination: {
    offset: number
    limit: number
  }
): GetRateChangeRequestListQueryVariables => {
  return {
    filter: paramsToFilter(filterValues),
    order: getOrder(filterValues),
    pagination
  }
}
