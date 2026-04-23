import { QueryParams } from '@staff-portal/query-params-state'
import { SortOption, SortOrder } from '@staff-portal/filters'

import {
  bestMatchTooltipText,
  matchBestMatchQueryConditions,
  matchRelevanceQueryConditions
} from '../sort-utils/sort-utils'

export const getSortOptions = (filterValues: QueryParams): SortOption[] => [
  {
    text: 'Best match',
    value: 'best_match_score',
    disabled: !matchBestMatchQueryConditions(filterValues),
    tooltipContent: bestMatchTooltipText
  },
  {
    text: 'Relevance',
    value: 'relevance',
    hidden: !matchRelevanceQueryConditions(filterValues)
  },
  { text: 'Application date', value: 'created_at' },
  { text: 'Price', value: 'price' },
  {
    text: 'Approval date',
    value: 'activated_at',
    defaultSort: SortOrder.DESC
  },
  { text: 'Last login', value: 'last_login' },
  { text: 'Last edited', value: 'last_edited' },
  { text: 'Screening rank', value: 'screening_rank' }
]
