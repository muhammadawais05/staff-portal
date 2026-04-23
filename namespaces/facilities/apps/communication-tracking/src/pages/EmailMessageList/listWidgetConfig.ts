import {
  FiltersConfig,
  SortOption,
  SortOrder,
  FilterConfigType
} from '@staff-portal/filters'

const CATEGORY_OPTIONS = [
  {
    label: 'Talent',
    value: 'talent'
  },
  {
    label: 'Company',
    value: 'company'
  },
  {
    label: 'Internal',
    value: 'internal'
  },
  {
    label: 'Notification',
    value: 'notification'
  },
  {
    label: 'Unknown',
    value: 'unknown'
  }
]

export const SORT_OPTIONS: SortOption[] = [
  {
    text: 'Date Sent',
    value: 'sent_at',
    defaultSort: SortOrder.DESC
  }
]

const FILTERS_CONFIG: FiltersConfig = [
  {
    type: FilterConfigType.CHECKBOX,
    name: 'categories',
    label: 'Include Category',
    options: CATEGORY_OPTIONS
  },
  {
    type: FilterConfigType.CHECKBOX,
    name: 'exclude_categories',
    label: 'Exclude Category',
    options: CATEGORY_OPTIONS
  },
  {
    type: FilterConfigType.DATE_RANGE,
    name: 'sent_at',
    label: 'Date Sent',
    options: {
      maxDate: new Date()
    }
  }
]

export const useFiltersConfig = () => {
  return {
    filtersConfig: FILTERS_CONFIG
  }
}

export enum BadgesKeys {
  USER_IDS = 'user_ids',
  EMAILS = 'email',
  FROM = 'from',
  TO = 'to',
  MESSAGE_ID = 'message_id'
}
