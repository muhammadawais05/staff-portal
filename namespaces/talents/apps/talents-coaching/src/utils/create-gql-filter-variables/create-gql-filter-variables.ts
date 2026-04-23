import {
  DateRange,
  OrderDirection,
  TalentCoachingEngagementFilter,
  TalentCoachingEngagementOrderField,
  TalentCoachingEngagementStatus
} from '@staff-portal/graphql/staff'
import { QueryParams } from '@staff-portal/query-params-state'
import {
  SortOrder,
  Sort,
  IdGqlParam,
  EnumToGqlParam,
  SingleEnumToGqlParam,
  DateRangeGqlParam,
  getSortBy
} from '@staff-portal/filters'

import { GetTalentCoachingEngagementsListQueryVariables } from '../../data/get-talent-coaching-engagements-list'
import { DEFAULT_SORT } from '../../constants'

const getOrder = (filterValues: QueryParams) => {
  const { order, target } = getSortBy(
    filterValues.sort as Sort | undefined,
    SortOrder.DESC,
    DEFAULT_SORT
  )

  return {
    field:
      SingleEnumToGqlParam(TalentCoachingEngagementOrderField)(target) ??
      DEFAULT_SORT,
    direction:
      SingleEnumToGqlParam(OrderDirection)(order) ?? OrderDirection.DESC
  }
}

const paramsToFilter = (
  filterValues: QueryParams
): TalentCoachingEngagementFilter => {
  const {
    status,
    assigneeId: coachId,
    talentName,
    talentActivatedAt
  } = filterValues

  return {
    ...(coachId
      ? {
          coachId: IdGqlParam()(coachId)
        }
      : {}),
    ...(talentActivatedAt
      ? {
          talentActivatedAt: DateRangeGqlParam()(talentActivatedAt as DateRange)
        }
      : {}),
    ...(talentName ? { talentName: talentName as string } : {}),
    ...(status
      ? {
          statuses: EnumToGqlParam(TalentCoachingEngagementStatus)([
            status as string
          ])
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
): GetTalentCoachingEngagementsListQueryVariables => {
  return {
    filter: paramsToFilter(filterValues),
    order: getOrder(filterValues),
    loadDisputeOperations: true,
    pagination
  }
}
