import {
  JobCommitment,
  JobWorkType,
  SourcingRequestStatus
} from '@staff-portal/graphql/staff'

export const SOURCING_REQUEST_STATUS_MAPPING: Record<
  SourcingRequestStatus,
  string
> = {
  [SourcingRequestStatus.DRAFTED]: 'Drafted',
  [SourcingRequestStatus.REQUESTED]: 'Requested',
  [SourcingRequestStatus.FEASIBILITY]: 'Feasibility',
  [SourcingRequestStatus.REQUEST_REJECTED]: 'Request Rejected',
  [SourcingRequestStatus.ACTIVE_SOURCING]: 'Active Sourcing',
  [SourcingRequestStatus.SOURCED]: 'Sourced',
  [SourcingRequestStatus.CLOSED_SOURCED]: 'Closed Sourced',
  [SourcingRequestStatus.CLOSED_NETWORK]: 'Closed Network',
  [SourcingRequestStatus.CLOSED_LOST]: 'Closed Lost',
  [SourcingRequestStatus.CLOSED_NOT_AVAILABLE]: 'Closed Not Available',
  [SourcingRequestStatus.PAUSED]: 'Paused',
  [SourcingRequestStatus.BACKLOG]: 'Backlog',
  [SourcingRequestStatus.MONITORING]: 'Monitoring'
}

export const JOB_WORK_TYPE_MAPPING: Record<JobWorkType, string> = {
  [JobWorkType.REMOTE]: 'Remote',
  [JobWorkType.ONSITE]: 'Onsite',
  [JobWorkType.MIXED]: 'Mixed (Remote + Onsite)',
  [JobWorkType.RECRUITING]: 'Recruiting Only'
}

export const JOB_COMMITMENT_MAPPING: Record<JobCommitment, string> = {
  [JobCommitment.FULL_TIME]: 'Full Time',
  [JobCommitment.PART_TIME]: 'Part Time',
  [JobCommitment.HOURLY]: 'Hourly'
}
