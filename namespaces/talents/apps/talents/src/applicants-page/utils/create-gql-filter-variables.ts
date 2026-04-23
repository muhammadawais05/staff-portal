/* eslint-disable max-statements */
import {
  TalentApplicantsOrderField,
  OrderDirection,
  OffsetPagination,
  DateRange,
  TalentFilterSource,
  TalentFilterReferrer,
  TalentSupplyHealthPriority,
  OfacStatus,
  TalentFilterMeetingStatus,
  TalentActivationFilter,
  SearchApplicantsFilter,
  TalentApplicantsBadgesFilter
} from '@staff-portal/graphql/staff'
import { QueryParams } from '@staff-portal/query-params-state'
import { encodeEntityId } from '@staff-portal/data-layer-service'
import { UserVerticalFragment } from '@staff-portal/verticals'
import {
  RangeGqlParam,
  parseBoolean,
  parseStringArray,
  parseString,
  SortOrder,
  Sort,
  getSortBy
} from '@staff-portal/filters'
import {
  getClaimerIdGqlValue,
  createGqlLocationVariable,
  createGqlDistanceVariable,
  createGqlFlagsVariables,
  createGqlVerticalIdsVariable,
  createGqlBadgesVariable
} from '@staff-portal/talents-list'

import { DEFAULT_SORT } from '../config'
import { GetTalentApplicantsListQueryVariables } from '../data'
import { getTopscreenClientGqlValue } from './get-topscreen-client-gql-value'

// eslint-disable-next-line max-statements
const createGqlFilterVariables = (
  filterValues: QueryParams,
  pagination: OffsetPagination,
  verticals?: UserVerticalFragment[]
): GetTalentApplicantsListQueryVariables => {
  const { order, target } = getSortBy(
    filterValues.sort as Sort | undefined,
    SortOrder.DESC,
    DEFAULT_SORT
  )

  const appliedOn = filterValues.applied_on as DateRange | undefined

  const claimerId = getClaimerIdGqlValue(filterValues.claimer_id)

  const countryIds = parseStringArray(filterValues?.country_ids)?.map(
    countryId => encodeEntityId(countryId, 'Country')
  )

  const { location } = createGqlLocationVariable(filterValues)

  const { distance } = createGqlDistanceVariable(filterValues)

  const timezones = filterValues.timezones as Range | undefined

  const sourcerIds = parseStringArray(filterValues?.sourcer_ids)?.map(
    // TODO: replace 'Test' with some real type once BE is fixed
    // https://toptal-core.atlassian.net/browse/GOLD-2966
    sourcerId => encodeEntityId(sourcerId, 'Test')
  )

  const excludedSourcerIds = parseStringArray(
    filterValues?.excluded_sourcer_ids
    // TODO: replace 'Test' with some real type once BE is fixed
    // https://toptal-core.atlassian.net/browse/GOLD-2966
  )?.map(exludedSourcerId => encodeEntityId(exludedSourcerId, 'Test'))

  const source = parseString<TalentFilterSource>(filterValues.source, true)

  const referred = parseString<TalentFilterReferrer>(
    filterValues.referred,
    true
  )

  const hasApplicationInfoSubmitted = parseBoolean(
    filterValues.has_application_info_submitted
  )

  const hasAdmissionPost = parseBoolean(filterValues.has_admission_post)

  const supplyHealthPriority = parseString<TalentSupplyHealthPriority>(
    filterValues.supply_health_priority,
    true
  )

  const reservedStatus = parseBoolean(filterValues.reserved_status)

  const ofacStatuses = parseStringArray<OfacStatus>(
    filterValues.ofac_status,
    true
  )

  const { flagIds, excludedFlagIds } = createGqlFlagsVariables(filterValues)

  const applicantFilters = parseString<SearchApplicantsFilter>(
    filterValues.applicant_filter,
    true
  )

  const activationFilterType = parseString<TalentActivationFilter>(
    filterValues.activation_filter_type,
    true
  )

  const meetingStatus = parseStringArray<TalentFilterMeetingStatus>(
    filterValues.meeting_status,
    true
  )

  const { verticalIds } = createGqlVerticalIdsVariable(filterValues, {
    verticals
  })

  const specializationIds = parseStringArray<string>(
    filterValues.specialization_ids
  )?.map(specializationId => encodeEntityId(specializationId, 'Specialization'))

  const topscreenClientId = getTopscreenClientGqlValue(
    filterValues.topscreen_client_id
  )

  const { badges } =
    createGqlBadgesVariable<TalentApplicantsBadgesFilter>(filterValues)

  return {
    filter: {
      appliedOn,
      claimerId,
      countryIds,
      location,
      distance,
      ...(timezones && {
        timezones: RangeGqlParam()(timezones)
      }),
      sourcerIds,
      excludedSourcerIds,
      source,
      referred,
      hasApplicationInfoSubmitted,
      hasAdmissionPost,
      supplyHealthPriority,
      reservedStatus,
      ofacStatuses,
      flagIds,
      excludedFlagIds,
      applicantFilters,
      activationFilterType,
      meetingStatus,
      verticalIds,
      specializationIds,
      topscreenClientId,
      badges
    },
    order: {
      direction: order as unknown as OrderDirection,
      field: target.toUpperCase() as TalentApplicantsOrderField
    },
    pagination
  }
}

export default createGqlFilterVariables
