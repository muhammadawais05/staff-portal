import { SortOption, SortOrder } from '@staff-portal/filters'

export const getSortOptions = (): SortOption[] => [
  {
    text: 'Job Posted',
    value: 'posted_at',
    defaultSort: SortOrder.DESC
  },
  {
    text: 'Claim Time',
    value: 'claimed_at'
  },
  {
    text: 'Title',
    value: 'title'
  },
  {
    text: 'Company Name',
    value: 'company_name'
  },
  {
    text: 'Vertical',
    value: 'vertical'
  },
  {
    text: 'Claimer Name',
    value: 'claimer_name'
  },
  {
    text: 'Commitment',
    value: 'commitment'
  },
  {
    text: 'Cumulative Status',
    value: 'cumulative_status'
  },
  {
    text: 'Matcher Name',
    value: 'matcher_name'
  }
]
