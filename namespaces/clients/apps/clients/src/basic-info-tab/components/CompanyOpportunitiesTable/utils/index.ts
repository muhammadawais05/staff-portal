import { Maybe, TaskStatus } from '@staff-portal/graphql/staff'
import { OpportunityFragment } from '@staff-portal/opportunities'

import { OPPORTUNITIES_MAPPING } from '../constants'

export const getOpportunityType = (type: Maybe<string> | undefined) =>
  type ? OPPORTUNITIES_MAPPING[type] : ''

export const isPendingTask = (status: string) =>
  (status.toLocaleUpperCase() as TaskStatus) === TaskStatus.PENDING

export const getPendingTasksCount = (opportunity: OpportunityFragment) =>
  opportunity.tasks?.nodes?.filter(node => isPendingTask(node.status))
    ?.length || 0

export const getJobsCount = (opportunity: OpportunityFragment) =>
  opportunity.jobs?.nodes?.length || 0
