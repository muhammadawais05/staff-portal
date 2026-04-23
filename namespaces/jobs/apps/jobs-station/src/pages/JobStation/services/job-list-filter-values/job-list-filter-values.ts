import {
  CumulativeJobStatus,
  PendingTalentStatus,
  DateRange,
  JobOrder,
  JobOrderField,
  OrderDirection,
  LogicOperator,
  JobBadgesFilter,
  BusinessTypes
} from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'
import { getCurrentDateString } from '@staff-portal/date-time-utils'
import { QueryParams } from '@staff-portal/query-params-state'
import {
  EnumToGqlParam,
  DateRangeGqlParam,
  badgesToGql,
  IdGqlParam,
  Sort,
  SingleEnumToGqlParam
} from '@staff-portal/filters'

import { GetJobsListQueryVariables } from '../../data/get-jobs-list'
import { DEFAULT_SORT } from '../../constants'
import { PostedAtOptions } from '../../types'
import { getOrder } from '../get-order/get-order'
import { encodeStaffId } from '../encode-staff-id/encode-staff-id'
import { getPostedAtFromDate } from '../get-posted-at-from-date/get-posted-at-from-date'

// eslint-disable-next-line complexity
export const toGqlVariables = (
  filterValues: QueryParams,
  pagination: { offset: number; limit: number }
): GetJobsListQueryVariables => {
  const {
    client,
    sales_reps,
    matchers,
    business_type,
    team_ids,
    cumulative_statuses,
    pending_talent_status,
    posted_at_range: postedAtRange,
    posted_at: postedAtKey,
    sort: sortBy,
    badges,
    logic
  }: {
    client?: string
    sales_reps?: string[]
    matchers?: string[]
    business_type?: BusinessTypes
    team_ids?: string[]
    cumulative_statuses?: string[]
    pending_talent_status?: string[]
    posted_at_range?: DateRange
    posted_at?: string
    sort?: Sort
    badges?: JobBadgesFilter
    logic?: LogicOperator
  } = filterValues

  const order = getOrder(
    sortBy as Sort | undefined,
    {
      field: DEFAULT_SORT.toUpperCase() as JobOrderField,
      direction: OrderDirection.ASC
    } as JobOrder
  )

  const salesRepIds = sales_reps && sales_reps.map(id => encodeStaffId(id))
  const matcherIds = matchers && matchers.map(id => encodeStaffId(id))
  const clientId = client && IdGqlParam()(client)
  const teamIds = team_ids && team_ids.map(id => encodeEntityId(id, 'Team'))
  const cumulativeStatuses =
    cumulative_statuses &&
    EnumToGqlParam(CumulativeJobStatus)(cumulative_statuses as string[])
  const pendingTalentStatus =
    pending_talent_status &&
    cumulativeStatuses?.includes(CumulativeJobStatus.PENDING_ENGINEER) &&
    EnumToGqlParam(PendingTalentStatus)(pending_talent_status as string[])

  const postedAtFrom = postedAtRange?.from
    ? postedAtRange.from
    : getPostedAtFromDate(postedAtKey as PostedAtOptions)
  const postedAtTill = postedAtRange?.till
    ? postedAtRange.till
    : getCurrentDateString()
  const businessType =
    business_type && SingleEnumToGqlParam(BusinessTypes)(business_type)

  return {
    filter: {
      ...(salesRepIds && { salesRepresentativeIds: salesRepIds }),
      ...(matcherIds && { matcherIds: matcherIds }),
      ...(clientId && { parentClientId: clientId }),
      ...(business_type && { businessType }),
      ...(teamIds && { teamIds }),
      ...(cumulativeStatuses && { cumulativeStatuses }),
      ...(pendingTalentStatus && { pendingTalentStatus }),
      ...((postedAtFrom || postedAtTill) && {
        postedAt: DateRangeGqlParam()({
          from: postedAtFrom,
          till: postedAtTill
        } as DateRange)
      }),
      ...(badges && {
        badges: badgesToGql<JobBadgesFilter>(
          badges as unknown[][],
          logic as LogicOperator
        )
      })
    },
    order,
    pagination
  }
}
