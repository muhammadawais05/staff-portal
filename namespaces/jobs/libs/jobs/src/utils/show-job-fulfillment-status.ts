import { JobStatus } from '@staff-portal/graphql/staff'
import { Maybe } from '@toptal/picasso/utils'

const FULFILLMENT_STATUSES = [JobStatus.PENDING_ENGINEER, JobStatus.ACTIVE]

export const showJobFulfillmentStatus = (
  talentCount: Maybe<number>,
  status: Maybe<JobStatus>
) =>
  talentCount &&
  status &&
  talentCount > 1 &&
  FULFILLMENT_STATUSES.includes(status)
