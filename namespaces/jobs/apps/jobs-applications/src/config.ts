import { JobApplicationStatus } from '@staff-portal/graphql/staff'
import { ColorType } from '@toptal/picasso'

export const JOB_APPLICATION_STATUS: Record<JobApplicationStatus, string> = {
  [JobApplicationStatus.ACCEPTED]: 'Accepted',
  [JobApplicationStatus.CANCELLED]: 'Cancelled',
  [JobApplicationStatus.PENDING]: 'Pending',
  [JobApplicationStatus.POSITION_FULFILLED]: 'Position fulfilled',
  [JobApplicationStatus.REJECTED]: 'Reject'
}

export const JOB_APPLICATION_STATUS_COLOR_MAPPING: Record<
  JobApplicationStatus,
  ColorType
> = {
  [JobApplicationStatus.ACCEPTED]: 'green',
  [JobApplicationStatus.CANCELLED]: 'red',
  [JobApplicationStatus.PENDING]: 'yellow',
  [JobApplicationStatus.POSITION_FULFILLED]: 'green',
  [JobApplicationStatus.REJECTED]: 'red'
}
