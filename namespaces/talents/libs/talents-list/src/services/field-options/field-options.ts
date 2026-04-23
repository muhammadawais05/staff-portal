import { NOT_SELECTED_OPTION } from '@staff-portal/config'
import {
  TalentAvailableHours,
  TalentCustomRequirements,
  TalentEnterpriseExperience,
  TalentFilterCumulativeStatus,
  TalentFilterMeetingStatus,
  TalentFilterReferrer,
  TalentFilterSource,
  TalentFilterWorkingStatus,
  TalentHealthStatusValue,
  TalentHiddenWith,
  TalentJobInterest,
  TalentManagementExperience,
  TalentOverlappingHours,
  TalentSupplyHealthPriority,
  TalentCommunityLeaderStatusFilterEnum,
  TalentCommunityLeaderTypeEnum,
  TalentJobPreferencesComparisonStatus
} from '@staff-portal/graphql/staff'

export const SOURCE_OPTIONS = [
  NOT_SELECTED_OPTION,
  { label: 'Non partner', value: TalentFilterSource.NON_PARTNER.toLowerCase() },
  { label: 'Partner', value: TalentFilterSource.PARTNER.toLowerCase() }
]

export const REFERRED_OPTIONS = [
  NOT_SELECTED_OPTION,
  {
    label: 'Not referred',
    value: TalentFilterReferrer.NOT_REFERRED.toLowerCase()
  },
  { label: 'Referred', value: TalentFilterReferrer.REFERRED.toLowerCase() }
]

export const BOOLEAN_SELECTOR_OPTIONS = [
  NOT_SELECTED_OPTION,
  { label: 'Yes', value: 'true' },
  { label: 'No', value: 'false' }
]

export const STATUSES_OPTIONS = [
  {
    label: 'In onboarding',
    value: TalentFilterCumulativeStatus.IN_ONBOARDING.toLowerCase()
  },
  {
    label: 'Applied',
    value: TalentFilterCumulativeStatus.APPLIED.toLowerCase()
  },
  { label: 'Paused', value: TalentFilterCumulativeStatus.PAUSED.toLowerCase() },
  { label: 'Active', value: TalentFilterCumulativeStatus.ACTIVE.toLowerCase() },
  {
    label: 'Rejected',
    value: TalentFilterCumulativeStatus.REJECTED.toLowerCase()
  },
  {
    label: 'Rejected (inactive)',
    value: TalentFilterCumulativeStatus.REJECTED_INACTIVE.toLowerCase()
  },
  {
    // TODO: this status will be removed soon by https://github.com/toptal/platform/pull/43754
    label: 'Rejected (automatic)',
    value: 'rejected_automatic'
  },
  {
    label: 'Disbanded',
    value: TalentFilterCumulativeStatus.REMOVED.toLowerCase()
  }
]

export const MEETING_STATUS_OPTIONS = [
  {
    label: 'Cancelled',
    value: TalentFilterMeetingStatus.CANCELLED.toLowerCase()
  },
  {
    label: 'Completed',
    value: TalentFilterMeetingStatus.COMPLETED.toLowerCase()
  },
  { label: 'Failed', value: TalentFilterMeetingStatus.FAILED.toLowerCase() },
  {
    label: 'No appointments',
    value: TalentFilterMeetingStatus.NO_APPOINTMENTS.toLowerCase()
  },
  {
    label: 'Rescheduled',
    value: TalentFilterMeetingStatus.RESCHEDULED.toLowerCase()
  },
  {
    label: 'Scheduled',
    value: TalentFilterMeetingStatus.SCHEDULED.toLowerCase()
  }
]

export const WORKING_STATUS_OPTIONS = [
  NOT_SELECTED_OPTION,
  {
    label: 'Not working',
    value: TalentFilterWorkingStatus.NOT_WORKING.toLowerCase()
  },
  { label: 'Working', value: TalentFilterWorkingStatus.WORKING.toLowerCase() }
]

export const COMMUNITY_LEADER_STATUS_OPTIONS = [
  NOT_SELECTED_OPTION,
  {
    label: 'Any status',
    value: TalentCommunityLeaderStatusFilterEnum.ANY.toLowerCase()
  },
  {
    label: 'Active',
    value: TalentCommunityLeaderStatusFilterEnum.APPROVED.toLowerCase()
  },
  {
    label: 'Applied',
    value: TalentCommunityLeaderStatusFilterEnum.APPLIED.toLowerCase()
  },
  {
    label: 'Rejected',
    value: TalentCommunityLeaderStatusFilterEnum.REJECTED.toLowerCase()
  },
  {
    label: 'Deleted',
    value: TalentCommunityLeaderStatusFilterEnum.DELETED.toLowerCase()
  },
  {
    label: 'No',
    value: TalentCommunityLeaderStatusFilterEnum.NONE.toLowerCase()
  }
]

export const COMMUNITY_LEADER_TYPE_OPTIONS = [
  NOT_SELECTED_OPTION,
  {
    label: 'Online Leader',
    value: TalentCommunityLeaderTypeEnum.ONLINE_LEADER.toLowerCase()
  },
  {
    label: 'Full Leader',
    value: TalentCommunityLeaderTypeEnum.COMMUNITY_LEADER.toLowerCase()
  }
]

export const AVAILABLE_HOURS_OPTIONS = [
  {
    label: 'Any',
    value: ''
  },
  {
    label: 'Unavailable',
    value: TalentAvailableHours.HOUR_UNAVAILABLE
  },
  {
    label: 'Available',
    value: TalentAvailableHours.HOUR_AVAILABLE
  },
  {
    label: '<= 20 hours',
    value: TalentAvailableHours.HOUR_1_TO_20
  },
  {
    label: '20 - 40 hours',
    value: TalentAvailableHours.HOUR_20_TO_40
  },
  {
    label: '>= 20 hours',
    value: TalentAvailableHours.HOUR_20
  },
  {
    label: '>= 40 hours',
    value: TalentAvailableHours.HOUR_40
  }
]

export const CUSTOM_REQUIREMENTS_OPTIONS = [
  {
    label: 'Background check',
    value: TalentCustomRequirements.BACKGROUND_CHECK.toLowerCase()
  },
  {
    label: 'Drug test',
    value: TalentCustomRequirements.DRUG_TEST.toLowerCase()
  },
  {
    label: 'Time tracking tools',
    value: TalentCustomRequirements.TIME_TRACKING_TOOLS.toLowerCase()
  }
]

export const HEALTH_STATUS_OPTIONS = [
  { text: 'None', value: TalentHealthStatusValue.NONE.toLowerCase() },
  {
    text: 'Watch list',
    value: TalentHealthStatusValue.WATCH_LIST.toLowerCase()
  },
  {
    text: 'Probation',
    value: TalentHealthStatusValue.PROBATION.toLowerCase()
  },
  {
    text: 'Suspension',
    value: TalentHealthStatusValue.SUSPENSION.toLowerCase()
  },
  {
    text: 'Top performer',
    value: TalentHealthStatusValue.TOP_PERFORMER.toLowerCase()
  }
]

export const MANAGEMENT_EXPERIENCE_OPTIONS = [
  {
    label: 'All talent',
    value: ''
  },
  {
    label: 'Any leadership',
    value: TalentManagementExperience.ANY_LEADERSHIP
  },
  {
    label: '1+ years',
    value: TalentManagementExperience.YEARS_1
  },
  {
    label: '3+ years',
    value: TalentManagementExperience.YEARS_3
  },
  {
    label: '5+ years',
    value: TalentManagementExperience.YEARS_5
  },
  {
    label: '10+ years',
    value: TalentManagementExperience.YEARS_10
  }
]

export const ENTERPRISE_EXPERIENCE_OPTIONS = [
  {
    label: 'All talent',
    value: ''
  },
  {
    label: 'With experience',
    value: TalentEnterpriseExperience.WITH_EXPERIENCE
  },
  {
    label: 'Without experience',
    value: TalentEnterpriseExperience.WITHOUT_EXPERIENCE
  }
]

export const SUPPLY_HEALTH_PRIORITY_OPTIONS = [
  NOT_SELECTED_OPTION,
  { label: 'Low', value: TalentSupplyHealthPriority.LOW.toLowerCase() },
  { label: 'Medium', value: TalentSupplyHealthPriority.MEDIUM.toLowerCase() },
  { label: 'High', value: TalentSupplyHealthPriority.HIGH.toLowerCase() }
]

export const OVERLAPPING_HOURS_OPTIONS = [
  {
    label: 'Show only talent with matching schedule',
    value: TalentOverlappingHours.SHOW_ONLY.toLowerCase()
  },
  {
    label: 'Show all talent',
    value: TalentOverlappingHours.SHOW_ALL.toLowerCase()
  }
]

export const JOB_INTEREST_OPTIONS = [
  {
    label: 'Hide not interested talent',
    value: TalentJobInterest.HIDE_NOT_INTERESTED.toLowerCase()
  },
  { label: 'Show all talent', value: '' }
]

export const HIDE_TALENTS_WHO_OPTIONS = [
  { label: 'Interviewed', value: TalentHiddenWith.ENGAGEMENTS.toLowerCase() },
  { label: 'Applied', value: TalentHiddenWith.JOB_APPLICATIONS.toLowerCase() },
  {
    label: 'Received an availability request',
    value: TalentHiddenWith.AVAILABILITY_REQUESTS.toLowerCase()
  }
]

export const HIDE_LOCKED_TALENTS_OPTIONS = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: '' }
]

export const TALENT_JOB_PREFERENCES_OVERLAP_STATUSES = [
  {
    text: 'Good Overlap',
    value: TalentJobPreferencesComparisonStatus.OK.toLowerCase()
  },
  {
    text: 'Bad Overlap',
    value: TalentJobPreferencesComparisonStatus.BAD.toLowerCase()
  },
  {
    text: 'Partial Overlap',
    value: TalentJobPreferencesComparisonStatus.PARTIAL.toLowerCase()
  },
  {
    text: 'None Overlap',
    value: TalentJobPreferencesComparisonStatus.NONE.toLowerCase()
  }
]
