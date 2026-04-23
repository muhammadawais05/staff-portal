import { JobStatus } from '@staff-portal/graphql/staff'
import { ColorType } from '@toptal/picasso'

export const JOB_STATUS_COLOR_MAPPING: Record<JobStatus, ColorType> = {
  [JobStatus.ACTIVE]: 'green',
  [JobStatus.CLOSED]: 'black',
  [JobStatus.PENDING_CLAIM]: 'yellow',
  [JobStatus.PENDING_ENGINEER]: 'yellow',
  [JobStatus.POSTPONED]: 'red',
  [JobStatus.REJECTED]: 'red',
  [JobStatus.REMOVED]: 'black',
  [JobStatus.SENDING_AWAY]: 'red',
  [JobStatus.DRAFTED_BY_SALES]: 'black',
  [JobStatus.DRAFT_CONFIRMED]: 'black',
  [JobStatus.DRAFT_PROJECTS]: 'black',
  [JobStatus.DRAFT_UNCONFIRMED]: 'black'
}

export const JOB_STATUS_TITLE_MAPPING: Record<JobStatus, string> = {
  [JobStatus.ACTIVE]: 'Active',
  [JobStatus.CLOSED]: 'Closed',
  [JobStatus.PENDING_CLAIM]: 'Pending Claim',
  [JobStatus.PENDING_ENGINEER]: 'Pending Talent',
  [JobStatus.POSTPONED]: 'Postponed',
  [JobStatus.REJECTED]: 'Rejected',
  [JobStatus.REMOVED]: 'Deleted',
  [JobStatus.SENDING_AWAY]: 'Sending Away',
  [JobStatus.DRAFTED_BY_SALES]: "Waiting for Client's Review",
  [JobStatus.DRAFT_CONFIRMED]: 'Reviewed by Client (TOS Accepted)',
  [JobStatus.DRAFT_PROJECTS]: 'Draft',
  [JobStatus.DRAFT_UNCONFIRMED]: 'Reviewed by Client'
}
