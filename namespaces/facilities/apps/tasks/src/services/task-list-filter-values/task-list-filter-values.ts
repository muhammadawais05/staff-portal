// topkit imports
import {
  DateRange,
  Range,
  LogicOperator,
  TaskFilterStatus,
  TaskBadgesFilter,
  TaskPriorityLevel,
  TaskOrder,
  TaskOrderField,
  OrderDirection,
  TimeRange
} from '@staff-portal/graphql/staff'
import { QueryParams } from '@staff-portal/query-params-state'
import {
  badgesToGql,
  Sort,
  IdGqlParam,
  DateRangeGqlParam,
  RangeGqlParam,
  EnumToGqlParam,
  SingleEnumToGqlParam
} from '@staff-portal/filters'

// src imports
import { GetTasksListQueryVariables } from '../../pages/TasksList/data/get-tasks-list'
import { DEFAULT_SORT } from '../../filtersConfig'
// modules imports
import { hasOnlyDisputedFilter, shouldLoadCounters } from '../../utils'

const getOrder = (
  sort: Sort | undefined,
  defaultOrder: TaskOrder
): TaskOrder => {
  if (!sort) {
    return defaultOrder
  }

  return {
    field: SingleEnumToGqlParam(TaskOrderField)(sort.target) ?? DEFAULT_SORT,
    direction:
      SingleEnumToGqlParam(OrderDirection)(sort.order) ?? OrderDirection.ASC
  }
}

const getFlags = (flagIds: string[] | undefined) => {
  return flagIds ? { flagIds } : {}
}

export const toGqlVariables = (
  filterValues: QueryParams,
  pagination: {
    offset: number
    limit: number
  }
): GetTasksListQueryVariables => {
  const {
    performer_id: performerId,
    watcher_id: watcherId,
    flag_ids: flagIds,
    due_date: dueDate,
    completed_at: completedAt,
    statuses: statusFilters,
    priorities,
    playbooks,
    timezones,
    sort: sortBy,
    badges,
    logic
  } = filterValues

  const order = getOrder(
    sortBy as Sort | undefined,
    {
      field: DEFAULT_SORT.toUpperCase() as TaskOrderField,
      direction: OrderDirection.ASC
    } as TaskOrder
  )
  const statuses =
    statusFilters && EnumToGqlParam(TaskFilterStatus)(statusFilters as string[])
  const performerIds = performerId && ([performerId] as string[])

  return {
    filter: {
      performerIds: performerIds as string[] | undefined,
      statuses: statuses as TaskFilterStatus[] | undefined,
      ...getFlags(flagIds as string[] | undefined),
      ...(watcherId
        ? {
            watcherId: IdGqlParam()(watcherId)
          }
        : {}),
      ...(dueDate
        ? {
            dueDate: DateRangeGqlParam()(dueDate as DateRange)
          }
        : {}),
      ...(completedAt
        ? {
            completedAt: DateRangeGqlParam()(
              completedAt as DateRange
            ) as TimeRange
          }
        : {}),
      ...(priorities
        ? {
            priorities: EnumToGqlParam(TaskPriorityLevel)(
              priorities as string[]
            )
          }
        : {}),
      ...(playbooks
        ? {
            playbookIdentifiers: playbooks as string[]
          }
        : {}),
      ...(timezones
        ? {
            timezones: RangeGqlParam()(timezones as Range)
          }
        : {}),
      ...(badges
        ? {
            badges: badgesToGql<TaskBadgesFilter>(
              badges as unknown[][],
              logic as LogicOperator
            )
          }
        : {})
    },
    order,
    pagination,
    loadDisputeOperations: hasOnlyDisputedFilter(
      statuses as TaskFilterStatus[] | undefined
    ),
    loadCounters: shouldLoadCounters(
      performerIds as string[] | undefined,
      statuses as TaskFilterStatus[] | undefined,
      order
    )
  }
}
