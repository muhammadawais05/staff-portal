import { useMemo } from 'react'
import { TalentCoachingEngagementStatus } from '@staff-portal/graphql/staff'
import {
  FiltersConfig,
  FiltersRowConfig,
  SelectFilterConfigOptions,
  FilterConfigType
} from '@staff-portal/filters'
import {
  COACHING_STATUS_MAPPING,
  useGetCoachingAssignees
} from '@staff-portal/talents-coaching'
import { NOT_SELECTED_OPTION } from '@staff-portal/config'

const COACHING_STATUS_OPTIONS: SelectFilterConfigOptions = [
  NOT_SELECTED_OPTION,
  ...Object.keys(COACHING_STATUS_MAPPING).map(key => ({
    label: COACHING_STATUS_MAPPING[key as TalentCoachingEngagementStatus].text,
    value: key.toLowerCase()
  }))
]

export const useFiltersConfig = () => {
  const { assignees, loading: loadingAssignees } = useGetCoachingAssignees()

  const maxDate = useMemo(() => new Date(), [])

  const assigneeOptions = useMemo(
    () => [
      NOT_SELECTED_OPTION,
      ...assignees.map(({ id, fullName }) => ({
        label: fullName,
        value: id
      }))
    ],
    [assignees]
  )

  const filtersConfig = useMemo<FiltersConfig>(() => {
    const filtersList: FiltersConfig = [
      [
        {
          type: FilterConfigType.SELECT,
          name: 'status',
          label: 'Coaching Status',
          options: COACHING_STATUS_OPTIONS,
          enableReset: true
        },
        {
          type: FilterConfigType.SELECT,
          name: 'assigneeId',
          label: 'Assignee',
          options: assigneeOptions,
          loading: loadingAssignees,
          enableReset: true
        }
      ]
    ]

    const dateRateConfig: FiltersRowConfig = [
      {
        type: FilterConfigType.DATE_RANGE,
        name: 'talentActivatedAt',
        label: 'Talent activated at',
        options: { maxDate }
      }
    ]

    return [...filtersList, ...dateRateConfig]
  }, [assigneeOptions, loadingAssignees])

  return { filtersConfig }
}
