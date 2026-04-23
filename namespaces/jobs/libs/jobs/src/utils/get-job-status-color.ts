import { ColorType } from '@toptal/picasso'
import {
  CumulativeJobStatus,
  Job,
  JobStatus
} from '@staff-portal/graphql/staff'
import { Maybe } from '@toptal/picasso/utils'

import { JobWithCurrentInvestigation } from '../types'
import { JobMultipleHiresStatus } from '../enums'
import { JOB_STATUS_COLOR_MAPPING } from '../config'

type JobStatusColorInput = Pick<
  Job,
  'cumulativeStatus' | 'hiredCount' | 'status' | 'talentCount'
> &
  JobWithCurrentInvestigation

const getMultipleHiresStatus = ({
  status,
  hiredCount,
  talentCount
}: JobStatusColorInput): Maybe<JobStatus> | JobMultipleHiresStatus | void => {
  if (talentCount && talentCount <= 1) {
    return
  }

  if (status === JobStatus.ACTIVE) {
    return JobMultipleHiresStatus.MHJR_ALL_ACTIVE
  }

  if (hiredCount === 0) {
    return JobMultipleHiresStatus.MHJR_NONE_ACTIVE
  }

  const stillHiring =
    talentCount && hiredCount && hiredCount < Math.max(1, talentCount)

  if (stillHiring) {
    return JobMultipleHiresStatus.MHJR_SOME_ACTIVE
  }

  return status
}

export const getJobStatusColor = (
  jobStatusColorInput: JobStatusColorInput,
  ignoreInvestigationStatus = false
): ColorType | undefined => {
  const multipleHiresStatus = getMultipleHiresStatus(jobStatusColorInput)

  if (multipleHiresStatus) {
    if (
      jobStatusColorInput.cumulativeStatus === CumulativeJobStatus.SENDING_AWAY
    ) {
      return JOB_STATUS_COLOR_MAPPING[CumulativeJobStatus.SENDING_AWAY]
    }

    return JOB_STATUS_COLOR_MAPPING[multipleHiresStatus]
  }

  if (jobStatusColorInput.currentInvestigation && !ignoreInvestigationStatus) {
    return 'red'
  }

  if (!jobStatusColorInput.cumulativeStatus) {
    return
  }

  return JOB_STATUS_COLOR_MAPPING[jobStatusColorInput.cumulativeStatus]
}
