/* eslint-disable max-lines */
import {
  FilterConfig,
  FiltersRowConfig,
  FilterConfigType,
  TIMEZONE_FILTER_OPTIONS
} from '@staff-portal/filters'
import { ClaimerOption } from '@staff-portal/facilities'
import { OFAC_STATUS_OPTIONS } from '@staff-portal/ofac-compliance'
import { NOT_SELECTED_PLACEHOLDER } from '@staff-portal/config'

import {
  DEFAULT_DISTANCE,
  DEFAULT_HOURLY_RATE_MAX,
  DEFAULT_HOURLY_RATE_MIN
} from '../../constants'
import { filterFieldOptions } from '../../services'
import {
  buildCountryOptions,
  buildFlagOptions,
  buildSourcerOptions,
  buildTalentTypesOptions
} from '../filters-utils/filters-utils'

export const DISTANCE_OPTIONS = [10, 50, 100, 200, 400].map(value => ({
  label: String(value),
  value: value === DEFAULT_DISTANCE ? '' : String(value)
}))

export const jobIDField: FilterConfig = {
  type: FilterConfigType.HIDDEN,
  name: 'job_id',
  label: 'Job'
}

export const claimerIdField = ({
  claimerOptions,
  loadingClaimers
}: {
  claimerOptions: ClaimerOption[]
  loadingClaimers: boolean
}): FiltersRowConfig => [
  {
    type: FilterConfigType.SELECT,
    name: 'claimer_id',
    label: 'Claimer',
    options: claimerOptions,
    loading: loadingClaimers
  }
]

export const appliedOn: FilterConfig = {
  type: FilterConfigType.DATE_RANGE,
  name: 'applied_on',
  label: 'Applied on'
}

export const availabilityConfirmed: FilterConfig = {
  type: FilterConfigType.DATE_RANGE,
  name: 'allocated_hours_confirmed_at',
  label: 'Availability confirmed'
}

export const reapplicationDate: FilterConfig = {
  type: FilterConfigType.DATE_RANGE,
  name: 'reapplication_date',
  label: 'Reapplication date'
}

export const sourcedBy = ({
  sourcerOptions,
  loadingSourcers
}: {
  sourcerOptions: ReturnType<typeof buildSourcerOptions>
  loadingSourcers: boolean
}): FilterConfig => ({
  type: FilterConfigType.TYPE_SELECTOR,
  name: 'sourcer_ids',
  label: 'Sourced by',
  loading: loadingSourcers,
  options: sourcerOptions,
  searchPlaceholder: 'Search Sourcers',
  placeholder: NOT_SELECTED_PLACEHOLDER
})

export const notSourcedBy = ({
  sourcerOptions,
  loadingSourcers
}: {
  sourcerOptions: ReturnType<typeof buildSourcerOptions>
  loadingSourcers: boolean
}): FilterConfig => ({
  type: FilterConfigType.TYPE_SELECTOR,
  name: 'excluded_sourcer_ids',
  label: 'Not sourced by',
  loading: loadingSourcers,
  options: sourcerOptions,
  searchPlaceholder: 'Search Sourcers',
  placeholder: NOT_SELECTED_PLACEHOLDER
})

export const allowedCountries = ({
  countryOptions,
  loadingCountries
}: {
  countryOptions: ReturnType<typeof buildCountryOptions>
  loadingCountries: boolean
}): FilterConfig => ({
  // TODO: use multiple select widget after https://toptal-core.atlassian.net/browse/SPC-695 is completed
  type: FilterConfigType.TAG_SELECTOR,
  name: 'country_ids',
  label: 'Allowed countries',
  options: countryOptions,
  loading: loadingCountries,
  placeholder: NOT_SELECTED_PLACEHOLDER
})

export const location: FilterConfig = {
  type: FilterConfigType.CITY,
  name: 'location',
  label: 'City'
}

export const distance: FilterConfig = {
  type: FilterConfigType.SELECT,
  name: 'distance',
  label: 'Radius (km)',
  options: DISTANCE_OPTIONS
}

export const timezone: FilterConfig = {
  type: FilterConfigType.SLIDER_RANGE,
  name: 'timezones',
  label: 'Time zone',
  options: TIMEZONE_FILTER_OPTIONS
}

export const hourlyRate = ({
  isSmallBusiness,
  talentMaxHourlyRateLimit,
  hidden
}: {
  isSmallBusiness?: boolean | null
  talentMaxHourlyRateLimit?: number | null
  hidden?: boolean
}): FilterConfig => {
  const maxHourlyRateLimit = talentMaxHourlyRateLimit || DEFAULT_HOURLY_RATE_MAX

  return {
    type: FilterConfigType.SLIDER_RANGE,
    name: isSmallBusiness ? 'client_hourly_rate' : 'hourly_rate',
    label: `${isSmallBusiness ? 'Client' : 'Talent'} hourly rate`,
    options: {
      min: DEFAULT_HOURLY_RATE_MIN,
      max: maxHourlyRateLimit,
      step: 1,
      minLabel: `$${DEFAULT_HOURLY_RATE_MIN}`,
      maxLabel: `$${maxHourlyRateLimit}+`,
      tooltipFormat: (value: number) =>
        `$${value === maxHourlyRateLimit ? `${value}+` : value}`,
      displayRender: (value: number) => `$${value}`,
      tillPropertyName: 'to'
    },
    hidden
  }
}

export const source: FilterConfig = {
  type: FilterConfigType.RADIO,
  name: 'source',
  label: 'By source',
  options: filterFieldOptions.SOURCE_OPTIONS
}

export const referred: FilterConfig = {
  type: FilterConfigType.RADIO,
  name: 'referred',
  label: 'Referred',
  options: filterFieldOptions.REFERRED_OPTIONS
}

export const cumulativeStatuses: FilterConfig = {
  type: FilterConfigType.CHECKBOX,
  name: 'cumulative_statuses',
  label: 'Status',
  options: filterFieldOptions.STATUSES_OPTIONS
}

export const meetingStatus: FilterConfig = {
  type: FilterConfigType.CHECKBOX,
  name: 'meeting_status',
  label: 'Meeting status',
  options: filterFieldOptions.MEETING_STATUS_OPTIONS
}

export const customRequirements: FilterConfig = {
  type: FilterConfigType.CHECKBOX,
  name: 'custom_requirements',
  label: 'Custom Requirements',
  options: filterFieldOptions.CUSTOM_REQUIREMENTS_OPTIONS
}

export const hasAdmissionPost: FilterConfig = {
  type: FilterConfigType.RADIO,
  name: 'has_admission_post',
  label: 'Admission post',
  options: filterFieldOptions.BOOLEAN_SELECTOR_OPTIONS
}

export const supplyHealthPriority: FilterConfig = {
  type: FilterConfigType.RADIO,
  name: 'supply_health_priority',
  label: 'Supply health priority',
  options: filterFieldOptions.SUPPLY_HEALTH_PRIORITY_OPTIONS
}

export const reservedStatus: FilterConfig = {
  type: FilterConfigType.RADIO,
  name: 'reserved_status',
  label: 'Sourcing request',
  options: filterFieldOptions.BOOLEAN_SELECTOR_OPTIONS
}

export const ofacStatus = ({ hidden }: { hidden: boolean }): FilterConfig => ({
  type: FilterConfigType.CHECKBOX,
  name: 'ofac_status',
  label: 'OFAC status',
  options: OFAC_STATUS_OPTIONS,
  hidden
})

export const suspendedByTalentAgreement = ({
  hidden
}: {
  hidden: boolean
}): FilterConfig => ({
  type: FilterConfigType.RADIO,
  name: 'suspended_by_talent_agreement',
  label: 'Suspended',
  options: filterFieldOptions.BOOLEAN_SELECTOR_OPTIONS,
  hidden
})

export const healthStatus = ({
  hidden
}: {
  hidden: boolean
}): FilterConfig => ({
  type: FilterConfigType.TAG_SELECTOR,
  name: 'health_status',
  label: 'Health status',
  options: filterFieldOptions.HEALTH_STATUS_OPTIONS,
  placeholder: NOT_SELECTED_PLACEHOLDER,
  hidden
})

export const excludeHealthStatus = ({
  hidden
}: {
  hidden: boolean
}): FilterConfig => ({
  type: FilterConfigType.TAG_SELECTOR,
  name: 'exclude_health_status',
  label: 'Exclude health status',
  options: filterFieldOptions.HEALTH_STATUS_OPTIONS,
  placeholder: NOT_SELECTED_PLACEHOLDER,
  hidden
})

export const flagIds = ({
  flagOptions,
  loadingFlags,
  hidden
}: {
  flagOptions: ReturnType<typeof buildFlagOptions>
  loadingFlags: boolean
  hidden: boolean
}): FilterConfig => ({
  // TODO: use multiple select widget after https://toptal-core.atlassian.net/browse/SPC-695 is completed
  type: FilterConfigType.TAG_SELECTOR,
  name: 'flag_ids',
  label: 'Flags',
  options: flagOptions,
  loading: loadingFlags,
  placeholder: NOT_SELECTED_PLACEHOLDER,
  hidden
})

export const excludedFlagIds = ({
  flagOptions,
  loadingFlags,
  hidden
}: {
  flagOptions: ReturnType<typeof buildFlagOptions>
  loadingFlags: boolean
  hidden: boolean
}): FilterConfig => ({
  // TODO: use multiple select widget after https://toptal-core.atlassian.net/browse/SPC-695 is completed
  type: FilterConfigType.TAG_SELECTOR,
  name: 'excluded_flag_ids',
  label: 'Flags excluded',
  options: flagOptions,
  loading: loadingFlags,
  placeholder: NOT_SELECTED_PLACEHOLDER,
  hidden
})

export const managementExperience: FilterConfig = {
  type: FilterConfigType.RADIO,
  name: 'management_experience',
  label: 'Previous leadership',
  options: filterFieldOptions.MANAGEMENT_EXPERIENCE_OPTIONS
}

export const enterpriseExperience: FilterConfig = {
  type: FilterConfigType.RADIO,
  name: 'enterprise_experience',
  label: 'Enterprise experience',
  options: filterFieldOptions.ENTERPRISE_EXPERIENCE_OPTIONS
}

export const workingStatus: FilterConfig = {
  type: FilterConfigType.RADIO,
  name: 'working_status',
  label: 'Working status',
  options: filterFieldOptions.WORKING_STATUS_OPTIONS
}

export const communityLeaderStatuses: FilterConfig = {
  type: FilterConfigType.RADIO,
  name: 'community_leader_statuses',
  label: 'Community leader status',
  options: filterFieldOptions.COMMUNITY_LEADER_STATUS_OPTIONS
}

export const communityLeaderType: FilterConfig = {
  type: FilterConfigType.RADIO,
  name: 'community_leader_type',
  label: 'Community leader type',
  options: filterFieldOptions.COMMUNITY_LEADER_TYPE_OPTIONS
}

export const availableHours: FilterConfig = {
  type: FilterConfigType.RADIO,
  name: 'available_hours',
  label: 'Available hours',
  options: filterFieldOptions.AVAILABLE_HOURS_OPTIONS
}

export const hadEngagements: FilterConfig = {
  type: FilterConfigType.RADIO,
  name: 'had_engagements',
  label: 'Had engagements',
  options: filterFieldOptions.BOOLEAN_SELECTOR_OPTIONS
}

export const inInvestigation: FilterConfig = {
  type: FilterConfigType.RADIO,
  name: 'in_investigation',
  label: 'In investigation',
  options: filterFieldOptions.BOOLEAN_SELECTOR_OPTIONS
}

export const overlappingHours = ({
  hidden
}: {
  hidden: boolean
}): FilterConfig => ({
  type: FilterConfigType.RADIO,
  name: 'overlapping_hours',
  label: 'Overlapping hours',
  options: filterFieldOptions.OVERLAPPING_HOURS_OPTIONS,
  hidden
})

export const jobInterest = ({ hidden }: { hidden: boolean }): FilterConfig => ({
  type: FilterConfigType.RADIO,
  name: 'job_interest',
  label: 'Job interest',
  options: filterFieldOptions.JOB_INTEREST_OPTIONS,
  hidden
})

export const roles = ({
  loadingTalentTypes,
  talentTypesOptions
}: {
  loadingTalentTypes: boolean
  talentTypesOptions: ReturnType<typeof buildTalentTypesOptions>
}): FilterConfig => ({
  type: FilterConfigType.TYPE_SELECTOR,
  name: 'roles',
  subCategoryName: 'specialization_ids',
  label: 'Talent type',
  placeholder: NOT_SELECTED_PLACEHOLDER,
  searchPlaceholder: 'Search Talent Types',
  loading: loadingTalentTypes,
  options: talentTypesOptions
})

export const hideTalentsWith = ({
  hidden
}: {
  hidden: boolean
}): FilterConfig => ({
  type: FilterConfigType.CHECKBOX,
  name: 'hide_talents_with',
  label: 'Hide talent who',
  options: filterFieldOptions.HIDE_TALENTS_WHO_OPTIONS,
  hidden
})

export const hideLockedTalent: FilterConfig = {
  type: FilterConfigType.RADIO,
  name: 'hide_locked_talent',
  label: 'Hide locked talent',
  options: filterFieldOptions.HIDE_LOCKED_TALENTS_OPTIONS
}

export const talentJobPreferencesOverlapStatuses = ({
  hidden
}: {
  hidden: boolean
}): FilterConfig => ({
  type: FilterConfigType.TAG_SELECTOR,
  name: 'overlap_statuses',
  label: 'Job preferences overlap',
  options: filterFieldOptions.TALENT_JOB_PREFERENCES_OVERLAP_STATUSES,
  hidden
})
