import { TaskFilterStatus } from '@staff-portal/graphql/staff'

export const hasOnlyDisputedFilter = (statuses?: TaskFilterStatus[] | null) =>
  statuses?.length === 1 && statuses[0] === TaskFilterStatus.DISPUTED
