import { SortOption, SortOrder } from '@staff-portal/filters'
import { TalentApplicantsOrderField } from '@staff-portal/graphql/staff'
import { QueryParams } from '@staff-portal/query-params-state'

import { matchRelevanceQueryConditions } from './sort-utils'

export const getSortOptions = (filterValues: QueryParams): SortOption[] => [
  {
    text: 'Priority',
    value: TalentApplicantsOrderField.SCREENING_PRIORITY.toLowerCase(),
    defaultSort: SortOrder.DESC
  },
  {
    text: 'Application Date',
    value: TalentApplicantsOrderField.CREATED_AT.toLowerCase()
  },
  {
    text: 'Last Login',
    value: TalentApplicantsOrderField.LAST_LOGIN.toLowerCase()
  },
  {
    text: 'Last Edited',
    value: TalentApplicantsOrderField.LAST_EDITED.toLowerCase()
  },
  {
    text: 'Location',
    value: TalentApplicantsOrderField.LOCATION.toLowerCase()
  },
  {
    text: 'Name',
    value: TalentApplicantsOrderField.NAME.toLowerCase()
  },
  {
    text: 'Relevance',
    value: TalentApplicantsOrderField.RELEVANCE.toLowerCase(),
    hidden: !matchRelevanceQueryConditions(filterValues)
  },
  {
    text: 'Screening Rank',
    value: TalentApplicantsOrderField.SCREENING_RANK.toLowerCase()
  }
]
