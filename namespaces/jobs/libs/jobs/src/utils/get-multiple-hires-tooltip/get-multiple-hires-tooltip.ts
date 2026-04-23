import { Maybe } from '@toptal/picasso/utils'
import { JobStatus } from '@staff-portal/graphql/staff'

export const MULTIPLE_HIRES_TOOLTIP =
  'This job has multiple hires. Expand job details to see the status of individual hires.'

export const getMultipleHiresTooltip = ({
  talentCount,
  status
}: {
  talentCount?: Maybe<number>
  status?: Maybe<JobStatus>
}) =>
  talentCount && talentCount > 1 && status !== JobStatus.PENDING_CLAIM
    ? MULTIPLE_HIRES_TOOLTIP
    : undefined
