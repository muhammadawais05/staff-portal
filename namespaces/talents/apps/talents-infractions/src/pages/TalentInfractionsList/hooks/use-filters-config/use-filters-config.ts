import { useMemo } from 'react'
import {
  TalentInfractionReasonValue,
  TalentInfractionStatusValue
} from '@staff-portal/graphql/staff'
import {
  FiltersConfig,
  SelectFilterConfigOptions,
  FilterConfigType
} from '@staff-portal/filters'
import { TalentAutocompleteEdgeFragment } from '@staff-portal/talents'
import { ClientAutocompleteEdgeFragment } from '@staff-portal/clients'
import { INFRACTION_REASON_MAPPING } from '@staff-portal/talents-infractions'

import { InfractionStaffAutocompleteEdgeFragment } from '../../data/infraction-staff-autocomplete-edge-fragment'
import {
  useGetCompanyFilterAutocompleteLabel,
  useGetCompanyFilterAutocompleteOptions,
  useGetTalentFilterAutocompleteLabel,
  useGetTalentFilterAutocompleteOptions,
  useGetInfractionStaffFilterAutocompleteLabel,
  useGetInfractionStaffFilterAutocompleteOptions
} from '../../hooks'
import { useGetInfractionAssignees } from '../../data'

const STATUSES_OPTIONS = [
  {
    label: 'Pending review',
    value: TalentInfractionStatusValue.PENDING_REVIEW
  },
  {
    label: 'Pending remediation',
    value: TalentInfractionStatusValue.PENDING_REMEDIATION
  },
  { label: 'Remediated', value: TalentInfractionStatusValue.REMEDIATED },
  {
    label: 'Dismissed (talent not at fault)',
    value: TalentInfractionStatusValue.DISMISSED
  },
  { label: 'Archived', value: TalentInfractionStatusValue.ARCHIVED }
]

const reasonOptions: SelectFilterConfigOptions = Object.keys(
  INFRACTION_REASON_MAPPING
).map(slug => ({
  label: INFRACTION_REASON_MAPPING[slug as TalentInfractionReasonValue].label,
  value: slug
}))

const useFiltersConfig = () => {
  const { data: assignees, loading: loadingAssignees } =
    useGetInfractionAssignees()
  const assigneeOptions: SelectFilterConfigOptions = useMemo(
    () =>
      assignees?.map(({ id, fullName }) => ({
        value: id,
        label: fullName
      })) || [],
    [assignees]
  )
  const filtersConfig = useMemo<FiltersConfig>(() => {
    const filtersList: FiltersConfig = [
      {
        type: FilterConfigType.DATE_RANGE,
        name: 'occur_date',
        label: 'Occur date'
      },
      {
        type: FilterConfigType.DATE_RANGE,
        name: 'submission_date',
        label: 'Submission date'
      },
      [
        {
          type: FilterConfigType.AUTOCOMPLETE,
          name: 'creator_id',
          label: 'Submitted by',
          useGetOptions: useGetInfractionStaffFilterAutocompleteOptions,
          useGetFilterLabel: useGetInfractionStaffFilterAutocompleteLabel,
          getKey: item =>
            (item as InfractionStaffAutocompleteEdgeFragment).node?.id,
          getId: item =>
            (item as InfractionStaffAutocompleteEdgeFragment).node?.id,
          getLabel: item =>
            (item as InfractionStaffAutocompleteEdgeFragment).label ?? ''
        },
        {
          type: FilterConfigType.SELECT,
          name: 'reason_slug',
          label: 'Reason',
          options: reasonOptions,
          enableReset: true
        }
      ],
      {
        type: FilterConfigType.SELECT,
        name: 'assignee_id',
        label: 'Assignee',
        options: assigneeOptions,
        loading: loadingAssignees,
        enableReset: true
      },
      {
        type: FilterConfigType.CHECKBOX,
        name: 'statuses',
        label: 'Statuses',
        options: STATUSES_OPTIONS
      },
      {
        type: FilterConfigType.AUTOCOMPLETE,
        name: 'client_id',
        label: 'Client',
        useGetOptions: useGetCompanyFilterAutocompleteOptions,
        useGetFilterLabel: useGetCompanyFilterAutocompleteLabel,
        getKey: item => (item as ClientAutocompleteEdgeFragment).node?.id,
        getId: item => (item as ClientAutocompleteEdgeFragment).node?.id,
        getLabel: item => (item as ClientAutocompleteEdgeFragment).label ?? ''
      },
      {
        type: FilterConfigType.AUTOCOMPLETE,
        name: 'talent_id',
        label: 'Talent',
        useGetOptions: useGetTalentFilterAutocompleteOptions,
        useGetFilterLabel: useGetTalentFilterAutocompleteLabel,
        getKey: item => (item as TalentAutocompleteEdgeFragment).node?.id,
        getId: item => (item as TalentAutocompleteEdgeFragment).node?.id,
        getLabel: item => (item as TalentAutocompleteEdgeFragment).label ?? ''
      }
    ]

    return filtersList
  }, [assigneeOptions, loadingAssignees])

  return { filtersConfig }
}

export default useFiltersConfig
