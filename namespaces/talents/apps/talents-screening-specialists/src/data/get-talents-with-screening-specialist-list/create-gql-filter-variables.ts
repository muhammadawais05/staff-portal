import {
  OrderDirection,
  TalentOrderField,
  TalentFilter
} from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'
import { QueryParams } from '@staff-portal/query-params-state'
import { DateRangeGqlParam, IdGqlParam } from '@staff-portal/filters'
import { GetTalentsListQueryVariables } from '@staff-portal/talents-list'

const DEFAULT_ORDER_FIELD = TalentOrderField.SCREENING_RANK

type FilterValues = {
  cumulative_statuses?: string[]
  meeting_status?: string[]
  logic?: string
  badges?: {
    keywords: string[]
    names: string[]
    emails: string[]
  }
  country_ids?: number[]
  flag_ids?: string[]
  excluded_flag_ids?: string[]
  timezones?: {
    from: string
    to: string
  }
  screening_specialist_id?: string
  screening_specialist_assignment_status?: string[]
  screening_specialist_assigned_on?: {
    from: string
    till: string
  }
  screening_specialist_assignment_archived_on?: {
    from: string
    till: string
  }
  screening_specialist_assignment_next_check_on?: {
    from: string
    till: string
  }
  screening_inactivity_rejection_deadline_date?: {
    from: string
    till: string
  }
  vertical_ids?: string[]
  specialization_ids?: string[]
}

const createGqlFlagsVariables = (filterValues: QueryParams) => ({
  flagIds: (filterValues?.flag_ids as string[] | undefined)?.map(id =>
    encodeEntityId(id, 'Flag')
  ),
  excludedFlagIds: (
    filterValues?.excluded_flag_ids as string[] | undefined
  )?.map(id => encodeEntityId(id, 'Flag'))
})

// eslint-disable-next-line complexity
const paramsToFilter = (filterValues: FilterValues) => {
  const {
    screening_specialist_assigned_on,
    screening_specialist_assignment_archived_on,
    screening_specialist_assignment_next_check_on,
    screening_inactivity_rejection_deadline_date,
    screening_specialist_id
  } = filterValues

  const { flagIds, excludedFlagIds } = createGqlFlagsVariables(filterValues)

  return {
    verticalIds: filterValues.vertical_ids || null,
    specializationIds: filterValues.specialization_ids || null,
    cumulativeStatuses: filterValues.cumulative_statuses?.map(
      (status: string) => status.toUpperCase()
    ),
    meetingStatus: filterValues.meeting_status?.map((status: string) =>
      status.toUpperCase()
    ),
    badges: {
      keywords: filterValues?.badges?.keywords,
      names: filterValues?.badges?.names,
      emails: filterValues?.badges?.emails,
      logic: filterValues?.logic?.toUpperCase()
    },
    flagIds,
    excludedFlagIds,
    countryIds: filterValues.country_ids?.length
      ? filterValues.country_ids
      : null,
    timezones: filterValues?.timezones && {
      ...(filterValues?.timezones.from && {
        from: Number(filterValues?.timezones.from)
      }),
      ...(filterValues?.timezones.to && {
        to: Number(filterValues?.timezones.to)
      })
    },
    screeningSpecialistAssignmentStatus:
      filterValues?.screening_specialist_assignment_status,
    screeningSpecialistAssignmentArchivedOn:
      screening_specialist_assignment_archived_on &&
      DateRangeGqlParam()(screening_specialist_assignment_archived_on),
    screeningSpecialistAssignedOn:
      screening_specialist_assigned_on &&
      DateRangeGqlParam()(screening_specialist_assigned_on),
    screeningSpecialistAssignmentNextCheckOn:
      screening_specialist_assignment_next_check_on &&
      DateRangeGqlParam()(screening_specialist_assignment_next_check_on),
    screeningInactivityRejectionDeadlineDate:
      screening_inactivity_rejection_deadline_date &&
      DateRangeGqlParam()(screening_inactivity_rejection_deadline_date),
    ...(screening_specialist_id?.length && {
      screeningSpecialistId: IdGqlParam()(screening_specialist_id)
    })
  } as TalentFilter
}

export const createGqlFilterVariables = (
  filterValues: FilterValues,
  pagination: { offset: number; limit: number }
): GetTalentsListQueryVariables => {
  return {
    filter: paramsToFilter(filterValues),
    order: {
      direction: OrderDirection.ASC,
      field: DEFAULT_ORDER_FIELD
    },
    pagination
  }
}
