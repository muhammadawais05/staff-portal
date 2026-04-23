import { JobScopes, JobStatus } from '@staff-portal/graphql/staff'

export const companyJobFilters = {
  scope: JobScopes.PENDING_AND_ACTIVE,
  statuses: [
    JobStatus.PENDING_CLAIM,
    JobStatus.POSTPONED,
    JobStatus.PENDING_ENGINEER,
    JobStatus.SENDING_AWAY
  ]
}
