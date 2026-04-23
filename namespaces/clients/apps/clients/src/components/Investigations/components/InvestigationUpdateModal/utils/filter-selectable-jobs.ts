import { INVESTIGABLE_JOB_STATUSES } from '../../../../../config'
import { InvestigationJobFragment } from '../../../data'

type JobId = string
type JobIdOrTitle = string

export const filterSelectableJobs = (
  jobs: InvestigationJobFragment[] = [],
  investigationJobsMap: Record<JobId, JobIdOrTitle>
) => {
  return jobs
    .filter(job => job.status && INVESTIGABLE_JOB_STATUSES.includes(job.status))
    .sort(job => (investigationJobsMap[job.id] ? -1 : 1))
}
