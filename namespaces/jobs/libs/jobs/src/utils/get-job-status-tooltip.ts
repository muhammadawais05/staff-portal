import {
  Job,
  JobStatus,
  CumulativeJobStatus
} from '@staff-portal/graphql/staff'
import { parseAndFormatDate } from '@staff-portal/date-time-utils'

import { JobWithCurrentInvestigation } from '../types'

type JobStatusTooltipInput = Pick<
  Job,
  | 'cumulativeStatus'
  | 'engagementEndedFeedbackReason'
  | 'status'
  | 'talentCount'
> &
  JobWithCurrentInvestigation

const JOB_MULTIPLE_HIRES_TOOLTIP =
  'This job has multiple hires. View job details to see the status of individual hires.'

const CLOSED_JOB_STATUSES = [
  CumulativeJobStatus.CLOSED,
  CumulativeJobStatus.END_SCHEDULED
]

export const getJobStatusTooltip = ({
  talentCount,
  status,
  cumulativeStatus,
  engagementEndedFeedbackReason,
  currentInvestigation
}: JobStatusTooltipInput): string | undefined => {
  const showMultipleHiresTooltip =
    talentCount && talentCount > 1 && status !== JobStatus.PENDING_CLAIM

  if (currentInvestigation) {
    return `Investigation since ${parseAndFormatDate(
      currentInvestigation.startedAt
    )}`
  }

  if (showMultipleHiresTooltip) {
    return JOB_MULTIPLE_HIRES_TOOLTIP
  }

  if (cumulativeStatus && CLOSED_JOB_STATUSES.includes(cumulativeStatus)) {
    return
  }

  return engagementEndedFeedbackReason?.name
}
