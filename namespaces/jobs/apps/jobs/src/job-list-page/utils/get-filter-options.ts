import {
  CumulativeJobStatus,
  JobWorkType,
  JobCommitment
} from '@staff-portal/graphql/staff'
import { BUSINESS_TYPE_OPTIONS } from '@staff-portal/clients'
import { NOT_SELECTED_OPTION } from '@staff-portal/config'

export const CUMULATIVE_JOB_STATUSES = [
  {
    label: 'Pending claim',
    value: CumulativeJobStatus.PENDING_CLAIM.toLowerCase()
  },
  {
    label: 'Pending engineer',
    value: CumulativeJobStatus.PENDING_ENGINEER.toLowerCase()
  },
  {
    label: 'Pending start',
    value: CumulativeJobStatus.PENDING_START.toLowerCase()
  },
  {
    label: 'On trial',
    value: CumulativeJobStatus.ON_TRIAL.toLowerCase()
  },
  {
    label: 'On hold',
    value: CumulativeJobStatus.ON_HOLD.toLowerCase()
  },
  {
    label: 'Active',
    value: CumulativeJobStatus.ACTIVE.toLowerCase()
  },
  {
    label: 'On break',
    value: CumulativeJobStatus.ON_BREAK.toLowerCase()
  },
  {
    label: 'End scheduled',
    value: CumulativeJobStatus.END_SCHEDULED.toLowerCase()
  },
  {
    label: 'Closed',
    value: CumulativeJobStatus.CLOSED.toLowerCase()
  },
  {
    label: 'Postponed',
    value: CumulativeJobStatus.POSTPONED.toLowerCase()
  },
  {
    label: 'Deleted',
    value: CumulativeJobStatus.REMOVED.toLowerCase()
  },
  {
    label: 'Rejected',
    value: CumulativeJobStatus.REJECTED.toLowerCase()
  },
  {
    label: 'Sending away',
    value: CumulativeJobStatus.SENDING_AWAY.toLowerCase()
  },
  {
    label: 'Pending legal',
    value: CumulativeJobStatus.PENDING_LEGAL.toLowerCase()
  }
]

export const LIMITED_JOB_STATUSES = [
  {
    label: 'Pending claim',
    value: CumulativeJobStatus.PENDING_CLAIM.toLowerCase()
  },
  {
    label: 'Pending engineer',
    value: CumulativeJobStatus.PENDING_ENGINEER.toLowerCase()
  }
]

export const WORK_TYPE_OPTIONS = [
  { label: 'Remote', value: JobWorkType.REMOTE.toLowerCase() },
  { label: 'Onsite', value: JobWorkType.ONSITE.toLowerCase() },
  { label: 'Mixed (Remote + Onsite)', value: JobWorkType.MIXED.toLowerCase() },
  { label: 'Recruiting Only', value: JobWorkType.RECRUITING.toLowerCase() }
]

export const COMMITMENT_OPTIONS = [
  { label: 'Full Time', value: JobCommitment.FULL_TIME.toLowerCase() },
  { label: 'Part Time', value: JobCommitment.PART_TIME.toLowerCase() },
  { label: 'Hourly', value: JobCommitment.HOURLY.toLowerCase() }
]

export const BOOLEAN_SELECTOR_OPTIONS = [
  NOT_SELECTED_OPTION,
  { label: 'Yes', value: 'true' },
  { label: 'No', value: 'false' }
]

export const TOPTAL_PROJECTS_OPTIONS = [
  NOT_SELECTED_OPTION,
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' }
]

export const INCLUDE_INTERNALS_OPTIONS = [
  { label: 'Yes', value: 'true' },
  { label: 'No', value: '' }
]

// use the text as the value to persist filters when switching to legacy version
export const BUSINESS_TYPE_FILTER_OPTIONS = BUSINESS_TYPE_OPTIONS.map(
  ({ text }) => ({
    label: text,
    value: text
  })
)
