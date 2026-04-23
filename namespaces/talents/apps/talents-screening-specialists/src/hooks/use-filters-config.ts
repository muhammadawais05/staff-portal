/* eslint-disable max-lines */
import { useMemo } from 'react'
import {
  TIMEZONE_FILTER_MIN,
  TIMEZONE_FILTER_MAX,
  TIMEZONE_FILTER_STEP,
  NOT_SELECTED_OPTION,
  NOT_SELECTED_PLACEHOLDER
} from '@staff-portal/config'
import {
  TalentFilterCumulativeStatus,
  TalentFilterMeetingStatus,
  SpecialistAssignmentStatuses,
  RoleType
} from '@staff-portal/graphql/staff'
import { decodeEntityId } from '@staff-portal/data-layer-service'
import { generateTimezoneOffset } from '@staff-portal/date-time-utils'
import { titleize } from '@staff-portal/string'
import {
  FiltersConfig,
  SelectFilterConfigOptions,
  FilterConfigType
} from '@staff-portal/filters'
import { useGetFlags, useGetCountries } from '@staff-portal/facilities'
import { useGetTalentTypes } from '@staff-portal/verticals'
import { useGetScreeningSpecialists } from '@staff-portal/talents-screening-specialists'

const STATUSES_OPTIONS = [
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

const MEETING_STATUSES_OPTIONS = [
  {
    label: 'Cancelled',
    value: TalentFilterMeetingStatus.CANCELLED.toLowerCase()
  },
  {
    label: 'Completed',
    value: TalentFilterMeetingStatus.COMPLETED.toLowerCase()
  },
  {
    label: 'Failed',
    value: TalentFilterMeetingStatus.FAILED.toLowerCase()
  },
  {
    label: 'No Appointments',
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

const UNASSIGNED_OPTION = { value: 'NONE', label: 'Unassigned' }
const ME_OPTION = { value: 'ME', label: 'Assigned to me' }

const TSS_STATUS_OPTIONS = [
  {
    label: 'Active',
    value: SpecialistAssignmentStatuses.ACTIVE
  },
  {
    label: 'Archived',
    value: SpecialistAssignmentStatuses.ARCHIVED
  }
]

const UNSUPPORTED_SPECIALIZATIONS_IDS = [
  'VjEtU3BlY2lhbGl6YXRpb24tMzAwMTA', // Designer - Digital Design
  'VjEtU3BlY2lhbGl6YXRpb24tMzAwMTI' // Finance Expert - Core
]

const useFiltersConfig = () => {
  // Allowed Countries filter setup
  const { countries, loading: loadingCountries } = useGetCountries()

  const countryOptions = useMemo(() => {
    if (!countries) {
      return []
    }

    const options = countries.map(({ id, name }) => ({
      value: id,
      label: name ?? ''
    }))

    return [NOT_SELECTED_OPTION, ...options]
  }, [countries])

  // Talent Type filter setup
  const { talentTypesWithSpecializations, loading: loadingTalentType } =
    useGetTalentTypes()

  const verticalsOptions = useMemo<SelectFilterConfigOptions>(() => {
    const options = (talentTypesWithSpecializations || []).map(vertical => {
      const verticalOption: { label: string; value: string } = {
        label: titleize(vertical.talentType),
        value: vertical.id
      }

      return verticalOption
    })

    return [NOT_SELECTED_OPTION, ...options]
  }, [talentTypesWithSpecializations])

  const specializationsOptions = useMemo<SelectFilterConfigOptions>(() => {
    const options = (talentTypesWithSpecializations || [])
      .map(vertical => {
        const verticalLabel = `${titleize(vertical.talentType)} Vertical`

        const specializations = vertical.specializations.nodes.map(
          ({ title, id }: { title: string; id: string }) => {
            return {
              label: `${verticalLabel}: ${title}`,
              value: id
            }
          }
        )

        return specializations
      })
      .filter(
        option =>
          option.length > 0 &&
          !UNSUPPORTED_SPECIALIZATIONS_IDS.includes(option[0].value)
      )

    return [NOT_SELECTED_OPTION, ...options].flat() // as SelectFilterConfigOptions
  }, [talentTypesWithSpecializations])

  // Assignee filter setup
  const { screeningSpecialists, loading: loadingAssignees } =
    useGetScreeningSpecialists()

  const { flags, loading: loadingFlags } = useGetFlags({
    roleType: RoleType.TALENT
  })

  const flagOptions = useMemo(() => {
    if (!flags) {
      return []
    }

    return flags.map(({ id, title }: { id: string; title: string }) => ({
      id: decodeEntityId(id).id,
      label: title ?? ''
    }))
  }, [flags])

  const assigneesOptions = useMemo(() => {
    if (!screeningSpecialists) {
      return [NOT_SELECTED_OPTION, UNASSIGNED_OPTION, ME_OPTION]
    }

    const options = screeningSpecialists.map(
      ({ id, fullName }: { id: string; fullName: string }) => ({
        value: id,
        label: fullName ?? ''
      })
    )

    return [NOT_SELECTED_OPTION, UNASSIGNED_OPTION, ME_OPTION, ...options]
  }, [screeningSpecialists])
  //

  const filtersConfig = useMemo<FiltersConfig>(
    () => [
      {
        type: FilterConfigType.CHECKBOX,
        name: 'screening_specialist_assignment_status',
        label: 'TSS Status',
        options: TSS_STATUS_OPTIONS
      },
      [
        // TODO: use multiple select widget after https://toptal-core.atlassian.net/browse/SPC-695 is completed
        {
          type: FilterConfigType.SELECT,
          name: 'vertical_ids',
          label: 'Vertical',
          options: verticalsOptions,
          loading: loadingTalentType
        },
        {
          type: FilterConfigType.SELECT,
          name: 'specialization_ids',
          label: 'Specialization',
          options: specializationsOptions,
          loading: loadingTalentType
        }
      ],
      {
        type: FilterConfigType.SELECT,
        name: 'screening_specialist_id',
        label: 'Assignee',
        options: assigneesOptions,
        loading: loadingAssignees
      },
      {
        type: FilterConfigType.DATE_RANGE,
        name: 'screening_specialist_assigned_on',
        label: 'Assigned On'
      },
      {
        type: FilterConfigType.DATE_RANGE,
        name: 'screening_specialist_assignment_archived_on',
        label: 'Archived On'
      },
      {
        type: FilterConfigType.DATE_RANGE,
        name: 'screening_specialist_assignment_next_check_on',
        label: 'Task Due Date'
      },
      {
        type: FilterConfigType.DATE_RANGE,
        name: 'screening_inactivity_rejection_deadline_date',
        label: 'Reject for inactivity due date'
      },
      {
        type: FilterConfigType.CHECKBOX,
        name: 'cumulative_statuses',
        label: 'Status',
        options: STATUSES_OPTIONS
      },
      {
        // TODO: use multiple select widget after https://toptal-core.atlassian.net/browse/SPC-695 is completed
        type: FilterConfigType.SELECT,
        name: 'country_ids',
        label: 'Allowed countries',
        options: countryOptions,
        loading: loadingCountries
      },
      {
        type: FilterConfigType.TYPE_SELECTOR,
        name: 'flag_ids',
        label: 'Flags',
        placeholder: NOT_SELECTED_PLACEHOLDER,
        searchPlaceholder: 'Search Flags',
        options: flagOptions,
        loading: loadingFlags
      },
      {
        type: FilterConfigType.TYPE_SELECTOR,
        name: 'excluded_flag_ids',
        label: 'Flags Excluded',
        placeholder: NOT_SELECTED_PLACEHOLDER,
        searchPlaceholder: 'Search Flags',
        options: flagOptions,
        loading: loadingFlags
      },
      {
        type: FilterConfigType.SLIDER_RANGE,
        name: 'timezones',
        label: 'Time zone',
        options: {
          min: TIMEZONE_FILTER_MIN,
          max: TIMEZONE_FILTER_MAX,
          step: TIMEZONE_FILTER_STEP,
          minLabel: generateTimezoneOffset(TIMEZONE_FILTER_MIN),
          maxLabel: generateTimezoneOffset(TIMEZONE_FILTER_MAX),
          tooltipFormat: (value: number) => generateTimezoneOffset(value),
          displayRender: (value: number) => generateTimezoneOffset(value),
          tillPropertyName: 'to'
        }
      },
      {
        type: FilterConfigType.CHECKBOX,
        name: 'meeting_status',
        label: 'Meeting Status',
        options: MEETING_STATUSES_OPTIONS
      }
    ],
    [
      verticalsOptions,
      specializationsOptions,
      loadingTalentType,
      assigneesOptions,
      loadingAssignees,
      countryOptions,
      loadingCountries,
      flagOptions,
      loadingFlags
    ]
  )

  return { filtersConfig }
}

export default useFiltersConfig
