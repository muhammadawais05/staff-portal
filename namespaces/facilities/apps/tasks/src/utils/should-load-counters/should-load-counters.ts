import {
  TaskFilterStatus,
  Maybe,
  TaskOrder,
  TaskOrderField
} from '@staff-portal/graphql/staff'

const checkDueDateOrder = (order?: Maybe<TaskOrder>) =>
  !order || order?.field === TaskOrderField.DUE_DATE

const checkSummaryBarStatus = (statuses?: Maybe<TaskFilterStatus[]>) =>
  !!statuses?.every(
    status =>
      status === TaskFilterStatus.PENDING ||
      status === TaskFilterStatus.COMPLETED_TODAY
  )

export const shouldLoadCounters = (
  performerIds?: Maybe<string[]>,
  statuses?: Maybe<TaskFilterStatus[]>,
  order?: Maybe<TaskOrder>
) =>
  Boolean(performerIds?.length) &&
  checkDueDateOrder(order) &&
  checkSummaryBarStatus(statuses)
