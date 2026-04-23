import { ColorType } from '@toptal/picasso'
import {
  CommitmentAvailability,
  EngagementCommitmentEnum,
  EngagementStatus,
  JobWorkType
} from '@staff-portal/graphql/staff'

export const ENGAGEMENT_COMMITMENT_COLOR_MAPPING: Record<
  EngagementCommitmentEnum,
  ColorType
> = {
  [EngagementCommitmentEnum.HOURLY]: 'yellow',
  [EngagementCommitmentEnum.PART_TIME]: 'yellow',
  [EngagementCommitmentEnum.FULL_TIME]: 'green'
}

export const ENGAGEMENT_COMMITMENT_MAPPING: Record<
  EngagementCommitmentEnum,
  string
> = {
  [EngagementCommitmentEnum.HOURLY]: 'Hourly',
  [EngagementCommitmentEnum.PART_TIME]: 'Part-time',
  [EngagementCommitmentEnum.FULL_TIME]: 'Full-time'
}

export const COMMITMENT_AVAILABILITY_MAPPING: Record<
  CommitmentAvailability,
  string
> = {
  [CommitmentAvailability.hourly]: 'Hourly',
  [CommitmentAvailability.part_time]: 'Part-time',
  [CommitmentAvailability.full_time]: 'Full-time'
}

export const REQUIRES_DECISION_STATUSES = [
  EngagementStatus.ON_TRIAL,
  EngagementStatus.ON_HOLD
]

export const IN_INTERVIEW_STATUSES = [
  EngagementStatus.PENDING,
  EngagementStatus.REVIEWED,
  EngagementStatus.PENDING_EXPIRATION,
  EngagementStatus.EXPIRATION_POSTPONED
]

export const CURRENT_STATUSES = [
  EngagementStatus.PENDING_LEGAL,
  EngagementStatus.SCHEDULED,
  EngagementStatus.ON_TRIAL,
  EngagementStatus.ON_HOLD,
  EngagementStatus.ACTIVE,
  EngagementStatus.ON_BREAK,
  EngagementStatus.END_SCHEDULED,
  EngagementStatus.CLOSED
]

export const WORK_TYPE_OPTIONS = [
  {
    text: 'Remote',
    value: JobWorkType.REMOTE
  },
  {
    text: 'Onsite',
    value: JobWorkType.ONSITE
  },
  {
    text: 'Mixed (Remote+Onsite)',
    value: JobWorkType.MIXED
  },
  {
    text: 'Recruiting Only',
    value: JobWorkType.RECRUITING
  }
]
