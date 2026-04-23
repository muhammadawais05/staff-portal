import { TalentInfractionOrderField } from '@staff-portal/graphql/staff'
import { QueryParamsOptions } from '@staff-portal/query-params-state'
import {
  SortOption,
  gqlIdQueryParam,
  searchBarQueryParam,
  SortOrder,
  dateRangeQueryParam,
  enumQueryParam
} from '@staff-portal/filters'

import { searchBarCategories } from '../../components'
import { ReasonSlugQueryParam } from './utils'

export const PAGE_SIZE = 10

export const DEFAULT_SORT = TalentInfractionOrderField.OCCURRED_AT

export const SORT_OPTIONS: SortOption[] = [
  {
    text: 'Occur date',
    value: TalentInfractionOrderField.OCCURRED_AT.toLowerCase(),
    defaultSort: SortOrder.DESC
  },
  {
    text: 'Submission date',
    value: TalentInfractionOrderField.CREATED_AT.toLowerCase(),
    defaultSort: SortOrder.DESC
  },
  {
    text: 'Assignee name',
    value: TalentInfractionOrderField.ASSIGNEE_NAME.toLowerCase(),
    defaultSort: SortOrder.DESC
  },
  {
    text: 'Talent name',
    value: TalentInfractionOrderField.TALENT_NAME.toLowerCase(),
    defaultSort: SortOrder.DESC
  }
]

export const TALENT_INFRACTIONS_QUERY_PARAMS_CONFIG: QueryParamsOptions = {
  badges: searchBarQueryParam(searchBarCategories),
  occur_date: dateRangeQueryParam,
  submission_date: dateRangeQueryParam,
  creator_id: gqlIdQueryParam('Staff'),
  reason_slug: ReasonSlugQueryParam,
  assignee_id: gqlIdQueryParam('Staff'),
  statuses: enumQueryParam,
  clientId: gqlIdQueryParam('Client'),
  talentId: gqlIdQueryParam('Talent'),
  engagementId: gqlIdQueryParam('Engagement')
}
