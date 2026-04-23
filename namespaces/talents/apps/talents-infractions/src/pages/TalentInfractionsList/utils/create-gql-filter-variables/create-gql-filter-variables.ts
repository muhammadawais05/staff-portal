import {
  OrderDirection,
  DateRange,
  TalentInfractionOrderField,
  TalentInfractionStatusValue,
  TalentInfractionReasonValue,
  LogicOperator,
  TalentInfractionBadgesFilter
} from '@staff-portal/graphql/staff'
import { QueryParams } from '@staff-portal/query-params-state'
import {
  IdGqlParam,
  SortOrder,
  Sort,
  getSortBy,
  DateRangeGqlParam,
  EnumToGqlParam,
  SingleEnumToGqlParam,
  badgesToGql
} from '@staff-portal/filters'

import { GetTalentInfractionsListQueryVariables } from '../../data/get-infractions-list'
import { DEFAULT_SORT } from '../../config'

const getOrder = (filterValues: QueryParams) => {
  const { order, target } = getSortBy(
    filterValues.sort as Sort | undefined,
    SortOrder.DESC,
    DEFAULT_SORT
  )

  return {
    field:
      SingleEnumToGqlParam(TalentInfractionOrderField)(target) ?? DEFAULT_SORT,
    direction: SingleEnumToGqlParam(OrderDirection)(order) ?? OrderDirection.ASC
  }
}
// eslint-disable-next-line complexity
const paramsToFilter = (filterValues: QueryParams) => {
  const {
    occur_date: occurredAt,
    submission_date: createdAt,
    creator_id: creatorId,
    reason_slug: reasonSlug,
    assignee_id: assigneeId,
    statuses,
    client_id: clientId,
    talent_id: talentId,
    engagement_id: engagementId,
    badges,
    logic
  } = filterValues

  return {
    ...(occurredAt
      ? {
          occurredAt: DateRangeGqlParam()(occurredAt as DateRange)
        }
      : {}),
    ...(createdAt
      ? {
          createdAt: DateRangeGqlParam()(createdAt as DateRange)
        }
      : {}),
    ...(creatorId
      ? {
          creatorId: IdGqlParam()(creatorId)
        }
      : {}),
    ...(reasonSlug
      ? {
          reasonSlug: SingleEnumToGqlParam(TalentInfractionReasonValue)(
            reasonSlug as string
          )
        }
      : {}),
    ...(assigneeId
      ? {
          assigneeId: IdGqlParam()(assigneeId)
        }
      : {}),
    ...(statuses
      ? {
          statuses: EnumToGqlParam(TalentInfractionStatusValue)(
            statuses as string[]
          )
        }
      : {}),
    ...(clientId
      ? {
          clientId: IdGqlParam()(clientId)
        }
      : {}),
    ...(talentId
      ? {
          talentId: IdGqlParam()(talentId)
        }
      : {}),
    ...(engagementId
      ? {
          engagementId: IdGqlParam()(engagementId)
        }
      : {}),
    ...(badges
      ? {
          badges: badgesToGql<TalentInfractionBadgesFilter>(
            badges as unknown[][],
            logic as LogicOperator
          )
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
): GetTalentInfractionsListQueryVariables => {
  return {
    filter: paramsToFilter(filterValues),
    order: getOrder(filterValues),
    pagination
  }
}
