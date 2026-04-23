import {
  TIMEZONE_FILTER_MIN,
  TIMEZONE_FILTER_MAX,
  TIMEZONE_FILTER_STEP
} from '@staff-portal/config'
import {
  TaskFilterStatus,
  TaskPriorityLevel,
  TaskOrderField
} from '@staff-portal/graphql/staff'
import { generateTimezoneOffset } from '@staff-portal/date-time-utils'
import {
  FilterConfigType,
  FiltersConfig,
  SortOption,
  SortOrder
} from '@staff-portal/filters'
import { TaskStaffAutocompleteEdgeFragment } from '@staff-portal/tasks'

import { TaskSortOption } from './enums'
import {
  useGetStaffFilterAutocompleteLabel,
  useGetStaffFilterAutocompleteOptions
} from './hooks'

const STATUSES_OPTIONS = [
  {
    label: 'Pending',
    value: TaskFilterStatus.PENDING.toLowerCase()
  },
  {
    label: 'Disputed',
    value: TaskFilterStatus.DISPUTED.toLowerCase()
  },
  {
    label: 'Completed today',
    value: TaskFilterStatus.COMPLETED_TODAY.toLowerCase()
  },
  {
    label: 'Completed',
    value: TaskFilterStatus.COMPLETED.toLowerCase()
  }
]
const PRIORITIES_OPTIONS = [
  {
    label: 'Low',
    value: TaskPriorityLevel.LOW.toLowerCase()
  },
  {
    label: 'Medium',
    value: TaskPriorityLevel.MEDIUM.toLowerCase()
  },
  {
    label: 'High',
    value: TaskPriorityLevel.HIGH.toLowerCase()
  }
]

export const FILTERS_CONFIG: FiltersConfig = [
  [
    {
      type: FilterConfigType.AUTOCOMPLETE,
      name: 'performer_id',
      label: 'Assignee',
      useGetOptions: useGetStaffFilterAutocompleteOptions,
      useGetFilterLabel: useGetStaffFilterAutocompleteLabel,
      getKey: item => (item as TaskStaffAutocompleteEdgeFragment).node?.id,
      getId: item => (item as TaskStaffAutocompleteEdgeFragment).node?.id,
      getLabel: item => (item as TaskStaffAutocompleteEdgeFragment).label ?? ''
    },
    {
      type: FilterConfigType.AUTOCOMPLETE,
      name: 'watcher_id',
      label: 'Watcher',
      useGetOptions: useGetStaffFilterAutocompleteOptions,
      useGetFilterLabel: useGetStaffFilterAutocompleteLabel,
      getKey: item => (item as TaskStaffAutocompleteEdgeFragment).node?.id,
      getId: item => (item as TaskStaffAutocompleteEdgeFragment).node?.id,
      getLabel: item => (item as TaskStaffAutocompleteEdgeFragment).label ?? ''
    }
  ],
  {
    type: FilterConfigType.DATE_RANGE,
    name: 'due_date',
    label: 'Due date'
  },
  {
    type: FilterConfigType.DATE_RANGE,
    name: 'completed_at',
    label: 'Completion date'
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
    name: 'statuses',
    label: 'Status',
    options: STATUSES_OPTIONS
  },
  {
    type: FilterConfigType.CHECKBOX,
    name: 'priorities',
    label: 'Priority',
    options: PRIORITIES_OPTIONS
  }
]

export const SORT_OPTIONS: SortOption[] = [
  {
    text: 'Due date',
    value: TaskSortOption.DUE_DATE,
    defaultSort: SortOrder.ASC
  },
  {
    text: 'Completion date',
    value: TaskSortOption.COMPLETED_AT
  },
  {
    text: 'Priority',
    value: TaskSortOption.PRIORITY
  },
  {
    text: 'Time',
    value: TaskSortOption.TIME
  },
  {
    text: 'Description',
    value: TaskSortOption.DESCRIPTION
  },
  {
    text: 'Related Contact',
    value: TaskSortOption.RELATED_CONTACT_NAME
  },
  {
    text: 'Starred',
    value: TaskSortOption.STARRED
  }
]
export const DEFAULT_SORT = TaskOrderField.DUE_DATE
