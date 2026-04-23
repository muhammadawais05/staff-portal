/* eslint-disable max-params */
/* eslint-disable complexity */
/* eslint-disable max-statements */
/* eslint-disable max-lines */
import {
  OrderDirection,
  DateRange,
  TalentFilterSource,
  TalentFilterReferrer,
  TalentFilterCumulativeStatus,
  TalentFilterMeetingStatus,
  TalentFilterWorkingStatus,
  TalentAvailableHours,
  TalentOverlappingHours,
  OfacStatus,
  SearchCandidatesDistanceOption,
  TalentBadgesFilter,
  TalentCustomRequirements,
  TalentHealthStatusValue,
  TalentManagementExperience,
  TalentSupplyHealthPriority,
  TalentHiddenWith,
  TalentEnterpriseExperience,
  TalentOnboardingPriority,
  TalentCommunityLeaderStatusFilterEnum,
  TalentCommunityLeaderTypeEnum,
  Range,
  TalentJobPreferencesComparisonStatus
} from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'
import { QueryParams } from '@staff-portal/query-params-state'
import {
  RangeGqlParam,
  badgesToGql,
  getPaginationOffset,
  parseBoolean,
  parseStringArray,
  parseString,
  SortOrder,
  Sort,
  getSortBy,
  GoogleCoordsParams
} from '@staff-portal/filters'
import { UserVerticalFragment } from '@staff-portal/verticals'

import { DEFAULT_SORT } from '../../constants'
import {
  shouldResetClientHourlyRate,
  shouldResetHideTalentsWith,
  shouldResetOverlappingHours
} from '../sort-utils/sort-utils'
import { getGqlJobId } from '../get-gql-job-id/get-gql-job-id'
import { GetTalentsListQueryVariables } from '../../data/get-talents-list/get-talents-list.staff.gql.types'
import { GetJobCandidatesQueryVariables } from '../../data/get-job-candidates/get-job-candidates.staff.gql.types'

type Options = {
  page: number
  verticals?: UserVerticalFragment[]
}

type GqlFilterVariables =
  | GetTalentsListQueryVariables
  | GetJobCandidatesQueryVariables

export const getClaimerIdGqlValue = (claimerId: unknown) => {
  if (!claimerId) {
    return
  }

  if (claimerId === 'me') {
    return claimerId.toUpperCase()
  }

  return encodeEntityId(claimerId as string, 'Staff')
}

export const createGqlLocationVariable = (filterValues: QueryParams) => {
  const locationFilter = filterValues.location as GoogleCoordsParams | undefined
  const location = locationFilter && {
    latitude: Number(locationFilter.latitude),
    longitude: Number(locationFilter.longitude)
  }

  return { location }
}

export const createGqlFlagsVariables = (filterValues: QueryParams) => ({
  flagIds: parseStringArray(filterValues?.flag_ids)?.map(id =>
    encodeEntityId(id, 'Flag')
  ),
  excludedFlagIds: parseStringArray(filterValues?.excluded_flag_ids)?.map(id =>
    encodeEntityId(id, 'Flag')
  )
})

export const createGqlDistanceVariable = (filterValues: QueryParams) => {
  const distanceFilter = parseString(filterValues.distance)

  const distance =
    distanceFilter &&
    SearchCandidatesDistanceOption[
      `DIST_${distanceFilter}` as SearchCandidatesDistanceOption
    ]

  return { distance: distance as SearchCandidatesDistanceOption }
}

export const createGqlJobSkillsBadges = (filterValues: QueryParams) => {
  return parseStringArray(
    (filterValues?.badges as TalentBadgesFilter)?.jobSkills
  )?.map(jobSkill => ({
    name: jobSkill
  }))
}

export const createGqlBadgesVariable = <T>(filterValues: QueryParams) => {
  const logic = filterValues?.logic as string
  const jobSkills = createGqlJobSkillsBadges(filterValues)

  const badgesFilter = {
    ...(filterValues?.badges as unknown[]),
    jobSkills
  } as unknown[][]

  const badges = badgesFilter && badgesToGql<T>(badgesFilter, logic)

  return { badges }
}

export const createGqlVerticalIdsVariable = (
  filterValues: QueryParams,
  options?: Pick<Options, 'verticals'>
) => {
  const verticals = options?.verticals || []
  const verticalIds = parseStringArray(filterValues.roles)
    ?.map(
      talentType =>
        verticals?.find(vertical => vertical.talentType === talentType)?.id
    )
    .filter(Boolean) as string[] | undefined

  return { verticalIds }
}

export const createGqlFilterVariables = (
  filterValues: QueryParams,
  options: Options
): GqlFilterVariables => {
  const { order, target } = getSortBy(
    filterValues.sort as Sort | undefined,
    SortOrder.DESC,
    DEFAULT_SORT
  )

  const claimerId = getClaimerIdGqlValue(filterValues.claimer_id)
  const appliedOn = filterValues.applied_on as DateRange | undefined
  const activatedAt = filterValues.activated_at as DateRange | undefined
  const reapplicationDate = filterValues.reapplication_date as
    | DateRange
    | undefined
  const allocatedHoursConfirmedAt =
    filterValues.allocated_hours_confirmed_at as DateRange | undefined

  const source = parseString<TalentFilterSource>(filterValues.source, true)

  const referred = parseString<TalentFilterReferrer>(
    filterValues.referred,
    true
  )

  const cumulativeStatuses = parseStringArray<TalentFilterCumulativeStatus>(
    filterValues.cumulative_statuses,
    true
  )

  const onboardingPriorities = parseStringArray<TalentOnboardingPriority>(
    filterValues.onboarding_priorities,
    true
  )

  const meetingStatus = parseStringArray<TalentFilterMeetingStatus>(
    filterValues.meeting_status,
    true
  )

  const ofacStatuses = parseStringArray<OfacStatus>(
    filterValues.ofac_status,
    true
  )
  const hasAdmissionPost = parseBoolean(filterValues.has_admission_post)
  const reservedStatus = parseBoolean(filterValues.reserved_status)
  const suspendedByTalentAgreement = parseBoolean(
    filterValues.suspended_by_talent_agreement
  )
  const workingStatus = parseString<TalentFilterWorkingStatus>(
    filterValues.working_status,
    true
  )
  const communityLeaderStatuses =
    parseString<TalentCommunityLeaderStatusFilterEnum>(
      filterValues.community_leader_statuses,
      true
    )
  const communityLeaderType = parseString<TalentCommunityLeaderTypeEnum>(
    filterValues.community_leader_type,
    true
  )

  const availableHours = parseString<TalentAvailableHours>(
    filterValues.available_hours,
    true
  )

  const overlappingHours = parseString<TalentOverlappingHours>(
    filterValues.overlapping_hours,
    true
  )

  const hadEngagements = parseBoolean(filterValues.had_engagements)
  const inInvestigation = parseBoolean(filterValues.in_investigation)

  const countryIds = parseStringArray(filterValues?.country_ids)?.map(
    countryId => encodeEntityId(countryId, 'Country')
  )

  // TODO: replace 'Test' with some real type once BE is fixed
  // https://toptal-core.atlassian.net/browse/GOLD-2966
  const sourcerIds = parseStringArray(filterValues?.sourcer_ids)?.map(
    sourcerId => encodeEntityId(sourcerId, 'Test')
  )

  // TODO: replace 'Test' with some real type once BE is fixed
  // https://toptal-core.atlassian.net/browse/GOLD-2966
  const excludedSourcerIds = parseStringArray(
    filterValues?.excluded_sourcer_ids
  )?.map(exludedSourcerId => encodeEntityId(exludedSourcerId, 'Test'))

  const { flagIds, excludedFlagIds } = createGqlFlagsVariables(filterValues)

  const timezones = filterValues.timezones as Range | undefined
  const hourlyRate = filterValues.hourly_rate as Range | undefined
  const clientHourlyRate = filterValues.client_hourly_rate as Range | undefined

  const { verticalIds } = createGqlVerticalIdsVariable(filterValues, options)

  const specializationIds = parseStringArray<string>(
    filterValues.specialization_ids
  )?.map(specializationId => encodeEntityId(specializationId, 'Specialization'))

  const { location } = createGqlLocationVariable(filterValues)

  const { distance } = createGqlDistanceVariable(filterValues)

  const { badges } = createGqlBadgesVariable<TalentBadgesFilter>(filterValues)

  const customRequirements = parseStringArray<TalentCustomRequirements>(
    filterValues.custom_requirements,
    true
  )

  const healthStatus = parseStringArray<TalentHealthStatusValue>(
    filterValues.health_status,
    true
  )

  const excludeHealthStatus = parseStringArray<TalentHealthStatusValue>(
    filterValues.exclude_health_status,
    true
  )

  const supplyHealthPriority = parseString<TalentSupplyHealthPriority>(
    filterValues.supply_health_priority,
    true
  )

  const managementExperience = parseString<TalentManagementExperience>(
    filterValues.management_experience,
    true
  )

  const enterpriseExperience = parseString<TalentEnterpriseExperience>(
    filterValues.enterprise_experience,
    true
  )

  const hideTalentsWith = parseStringArray<TalentHiddenWith>(
    filterValues.hide_talents_with,
    true
  )

  const hideLockedTalent = parseBoolean(filterValues.hide_locked_talent)

  const overlapStatuses =
    parseStringArray<TalentJobPreferencesComparisonStatus>(
      filterValues.overlap_statuses,
      true
    )

  const limit = filterValues.limit as number

  const variables = {
    filter: {
      claimerId,
      flagIds,
      excludedFlagIds,
      appliedOn,
      activatedAt,
      reapplicationDate,
      allocatedHoursConfirmedAt,
      ...(timezones && {
        timezones: RangeGqlParam()(timezones)
      }),
      ...(hourlyRate && {
        hourlyRate: RangeGqlParam()(hourlyRate)
      }),
      ...(clientHourlyRate && {
        clientHourlyRate: shouldResetClientHourlyRate(filterValues)
          ? undefined
          : RangeGqlParam()(clientHourlyRate)
      }),
      source,
      referred,
      cumulativeStatuses,
      meetingStatus,
      hasAdmissionPost,
      reservedStatus,
      suspendedByTalentAgreement,
      workingStatus,
      communityLeaderStatuses,
      communityLeaderType,
      availableHours,
      hadEngagements,
      inInvestigation,
      overlappingHours: shouldResetOverlappingHours(filterValues)
        ? undefined
        : overlappingHours,
      ofacStatuses,
      countryIds,
      sourcerIds,
      excludedSourcerIds,
      location,
      distance,
      badges,
      verticalIds,
      specializationIds,
      customRequirements,
      healthStatus,
      excludeHealthStatus,
      managementExperience,
      enterpriseExperience,
      onboardingPriorities,
      supplyHealthPriority,
      hideTalentsWithV2: shouldResetHideTalentsWith(filterValues)
        ? undefined
        : hideTalentsWith,
      hideLockedTalent,
      overlapStatuses
    },
    order: {
      direction: order as unknown as OrderDirection,
      field: target.toUpperCase()
    },
    pagination: {
      offset: getPaginationOffset(options.page, limit),
      limit
    }
  }

  if (!filterValues.job_id) {
    return variables as GetTalentsListQueryVariables
  }

  return {
    ...variables,
    jobId: getGqlJobId(filterValues.job_id) as string
  } as GetJobCandidatesQueryVariables
}
