import {
  Job,
  CumulativeJobStatus,
  JobStatus
} from '@staff-portal/graphql/staff'
import { titleize } from '@staff-portal/string'

import { showJobFulfillmentStatus } from './show-job-fulfillment-status'
import { JOB_STATUS_TEXT_MAPPING } from '../config'

type JobStatusInput = Pick<
  Job,
  | 'cumulativeStatus'
  | 'hiredCount'
  | 'matcherCallScheduled'
  | 'status'
  | 'talentCount'
>

const buildVerboseStatus = (
  { status, hiredCount, talentCount, matcherCallScheduled }: JobStatusInput,
  statusText: string,
  compact = false
) => {
  const positionStatus = compact ? 'Filled' : 'Positions Filled'
  const showFulfillmentStatus = showJobFulfillmentStatus(talentCount, status)
  const isPendingClaim = status === JobStatus.PENDING_CLAIM

  const result = showFulfillmentStatus
    ? `${hiredCount} of ${talentCount} ${positionStatus}`
    : titleize(statusText, { capitalizeAllWords: false })

  if (!matcherCallScheduled && isPendingClaim) {
    return `${result} (no call)`
  }

  return result
}

export const getJobVerboseStatus = (
  jobStatusInput: JobStatusInput,
  overwrittenStatus?: JobStatus | CumulativeJobStatus,
  compact?: boolean
) => {
  const jobStatus = overwrittenStatus ?? jobStatusInput.cumulativeStatus

  const statusText = jobStatus ? JOB_STATUS_TEXT_MAPPING[jobStatus] : ''

  return buildVerboseStatus(jobStatusInput, statusText, compact)
}
