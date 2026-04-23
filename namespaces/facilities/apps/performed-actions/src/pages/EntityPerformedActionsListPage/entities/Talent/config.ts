import { FilterConfig, FilterConfigType } from '@staff-portal/filters'

import { TalentPerformedActionsChangeTypeFilter } from './enums'

const CHANGE_TYPE_FILTER_OPTIONS = [
  {
    label: 'Rate Change',
    value: TalentPerformedActionsChangeTypeFilter.RateChange
  },
  {
    label: 'Availability Change',
    value: TalentPerformedActionsChangeTypeFilter.AvailabilityChange
  },
  {
    label: 'Flags',
    value: TalentPerformedActionsChangeTypeFilter.Flags
  }
]

export const CHANGE_TYPE_FILTER: FilterConfig = {
  type: FilterConfigType.CHECKBOX,
  name: 'changeType',
  label: 'Display History Entries',
  labelWidth: 13.5,
  gridSize: 'auto',
  options: CHANGE_TYPE_FILTER_OPTIONS
}

export const CHANGE_TYPE_FILTER_TO_CHRONICLES_ACTION_MAPPING: Record<
  TalentPerformedActionsChangeTypeFilter,
  string
> = {
  [TalentPerformedActionsChangeTypeFilter.AvailabilityChange]: `filter:availability_change`,
  [TalentPerformedActionsChangeTypeFilter.Flags]: `filter:flags`,
  [TalentPerformedActionsChangeTypeFilter.RateChange]: `filter:rate_change`
}
