import {
  BusinessTypes,
  CumulativeJobStatus,
  JobBadgesFilter,
  JobCommitment,
  JobOrderField,
  JobWorkType,
  OrderDirection
} from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'
import { QueryParams } from '@staff-portal/query-params-state'
import {
  badgesToGql,
  parseStringArray,
  RangeGqlParam,
  SortOrder,
  EncodedRange,
  Sort,
  booleanToGql,
  getSortBy,
  SingleEnumToGqlParam,
  IdGqlParam
} from '@staff-portal/filters'
import { getVerticalIds, UserVerticalFragment } from '@staff-portal/verticals'
import { BUSINESS_TYPE_OPTIONS } from '@staff-portal/clients'

import { DEFAULT_SORT } from '../config'
import { GetJobListQueryVariables } from '../pages/JobsList/data/get-jobs-list'

type Options = {
  pagination: { offset: number; limit: number }
  verticals?: UserVerticalFragment[]
}

export type GqlOrder = {
  direction: OrderDirection
  field: string
}

const createGqlBadgesVariable = (filterValues: QueryParams) => {
  const logic = filterValues?.logic as string | undefined

  const badgesFilter = filterValues?.badges as unknown[][] | undefined

  const badges =
    badgesFilter && badgesToGql<JobBadgesFilter>(badgesFilter, logic)

  return { badges }
}

const createGqlVerticalIdsVariable = (
  filterValues: QueryParams,
  options?: Options
) => {
  const verticals = options?.verticals || []
  const verticalIds = getVerticalIds({
    jobTypes: filterValues.job_types,
    verticals
  })

  return { verticalIds }
}

const getClaimerGqlValue = (claimerId: unknown) => {
  if (!claimerId) {
    return undefined
  }

  if (claimerId === 'none' || claimerId === 'me') {
    return claimerId.toUpperCase()
  }

  return encodeEntityId(claimerId as string, 'Staff')
}

const getBusinessTypeGqlValue = (filterValues: QueryParams) => {
  if (!filterValues.business_type) {
    return undefined
  }

  // lookup the enum value to allow query param to persist when switching to legacy version
  const businessTypeEnumValue = BUSINESS_TYPE_OPTIONS.find(
    ({ text }) => text === (filterValues.business_type as string)
  )?.value as string
  const businessType = SingleEnumToGqlParam(BusinessTypes)(
    businessTypeEnumValue
  )

  return businessType
}

const getParentClientId = (filterValues: QueryParams) => {
  if (!filterValues.parent_client_id) {
    return undefined
  }

  return IdGqlParam()(filterValues.parent_client_id)
}

// eslint-disable-next-line max-statements
const createGqlFilterVariables = (
  filterValues: QueryParams,
  options: Options
): GetJobListQueryVariables => {
  const { order, target } = getSortBy(
    filterValues.sort as Sort | undefined,
    SortOrder.DESC,
    DEFAULT_SORT
  )
  const claimer = getClaimerGqlValue(filterValues.claimer_id)

  const companyClaimer = getClaimerGqlValue(filterValues.company_claimer_id)

  const projectSalesSpecialist = getClaimerGqlValue(
    filterValues.project_sales_specialist_id
  )

  const projectRelationshipManager = getClaimerGqlValue(
    filterValues.project_relationship_manager_id
  )

  const accountManager = getClaimerGqlValue(filterValues.account_manager_id)

  const relationshipManager = getClaimerGqlValue(
    filterValues.relationship_manager_id
  )

  const { badges } = createGqlBadgesVariable(filterValues)

  const timezones = filterValues.timezones as EncodedRange | undefined

  const cumulativeStatuses = parseStringArray<CumulativeJobStatus>(
    filterValues.cumulative_statuses,
    true
  )
  const { verticalIds } = createGqlVerticalIdsVariable(filterValues, options)

  const specializationIds = parseStringArray(
    filterValues.specialization_ids
  )?.map(specializationId => encodeEntityId(specializationId, 'Specialization'))

  const workTypes = parseStringArray<JobWorkType>(filterValues.work_types, true)
  const commitments = parseStringArray<JobCommitment>(
    filterValues.commitments,
    true
  )

  const inInvestigation = booleanToGql(filterValues.in_investigation)

  const includeInternal = booleanToGql(filterValues.include_internal)

  const skillLongShot = booleanToGql(filterValues.skill_long_shot)

  const toptalProjects = booleanToGql(filterValues.toptal_projects)

  const businessType = getBusinessTypeGqlValue(filterValues)

  const parentClientId = getParentClientId(filterValues)

  return {
    filter: {
      claimer,
      companyClaimer,
      projectSalesSpecialist,
      projectRelationshipManager,
      relationshipManager,
      accountManager,
      badges,
      cumulativeStatuses,
      verticalIds,
      specializationIds,
      workTypes,
      commitments,
      inInvestigation,
      includeInternal,
      skillLongShot,
      toptalProjects,
      businessType,
      parentClientId,
      ...(timezones && {
        timezones: RangeGqlParam()(timezones)
      })
    },
    order: {
      direction: order as unknown as OrderDirection,
      field: target.toUpperCase() as JobOrderField
    },
    pagination: options.pagination
  }
}

export default createGqlFilterVariables
