import {
  FilterConfig,
  FiltersRowConfig,
  FilterConfigType,
  TIMEZONE_FILTER_OPTIONS
} from '@staff-portal/filters'
import { ClaimerOption } from '@staff-portal/facilities'
import { OFAC_STATUS_OPTIONS } from '@staff-portal/ofac-compliance'
import {
  filterFieldOptions,
  buildCountryOptions,
  buildFlagOptions,
  buildSourcerOptions,
  buildTalentTypesOptions,
  DISTANCE_OPTIONS
} from '@staff-portal/talents-list'
import { NOT_SELECTED_PLACEHOLDER } from '@staff-portal/config'

import { buildTopscreenClientOptions } from '../utils/build-topscreen-client-options'
import {
  APPLICATION_FORM_OPTIONS,
  SCREENING_OPTIONS,
  ACTIVATION_OPTIONS
} from './field-options'

export const appliedOn: FilterConfig = {
  type: FilterConfigType.DATE_RANGE,
  name: 'applied_on',
  label: 'Applied on'
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

export const country = ({
  countryOptions,
  loadingCountries
}: {
  countryOptions: ReturnType<typeof buildCountryOptions>
  loadingCountries: boolean
}): FilterConfig => ({
  type: FilterConfigType.TAG_SELECTOR,
  name: 'country_ids',
  label: 'Country',
  options: countryOptions,
  loading: loadingCountries,
  placeholder: NOT_SELECTED_PLACEHOLDER
})

export const city: FilterConfig = {
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

export const applicationForm: FilterConfig = {
  type: FilterConfigType.RADIO,
  name: 'has_application_info_submitted',
  label: 'Application form',
  options: APPLICATION_FORM_OPTIONS
}

export const admissionPost: FilterConfig = {
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

export const sourcingRequest: FilterConfig = {
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

export const flagIds = ({
  flagOptions,
  loadingFlags,
  hidden
}: {
  flagOptions: ReturnType<typeof buildFlagOptions>
  loadingFlags: boolean
  hidden: boolean
}): FilterConfig => ({
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
  type: FilterConfigType.TAG_SELECTOR,
  name: 'excluded_flag_ids',
  label: 'Flags excluded',
  options: flagOptions,
  loading: loadingFlags,
  placeholder: NOT_SELECTED_PLACEHOLDER,
  hidden
})

export const screening: FilterConfig = {
  type: FilterConfigType.RADIO,
  name: 'applicant_filter',
  label: 'Screening',
  gridSize: 3,
  options: SCREENING_OPTIONS
}

export const activation: FilterConfig = {
  type: FilterConfigType.RADIO,
  name: 'activation_filter_type',
  label: 'Activation',
  gridSize: 3,
  options: ACTIVATION_OPTIONS
}

export const meetingStatus: FilterConfig = {
  type: FilterConfigType.CHECKBOX,
  name: 'meeting_status',
  label: 'Meeting status',
  gridSize: 3,
  options: filterFieldOptions.MEETING_STATUS_OPTIONS
}

export const talentTypes = ({
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

export const topscreenClients = ({
  topscreenClientOptions,
  loadingTopscreenClients
}: {
  topscreenClientOptions: ReturnType<typeof buildTopscreenClientOptions>
  loadingTopscreenClients: boolean
}): FiltersRowConfig => [
  {
    type: FilterConfigType.SELECT,
    name: 'topscreen_client_id',
    label: 'TopScreen Client',
    placeholder: NOT_SELECTED_PLACEHOLDER,
    options: topscreenClientOptions,
    loading: loadingTopscreenClients
  }
]
