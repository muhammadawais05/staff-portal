import { Job } from '@staff-portal/graphql/staff'

import { JobWithCurrentInvestigation } from './job-with-current-investigation'

export type JobStatusInput = Pick<
  Job,
  | 'talentCount'
  | 'status'
  | 'hiredCount'
  | 'matcherCallScheduled'
  | 'cumulativeStatus'
> &
  JobWithCurrentInvestigation
