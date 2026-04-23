import { TalentCoachingEngagementOrderField } from '@staff-portal/graphql/staff'
import { QueryParamsOptions } from '@staff-portal/query-params-state'
import {
  SortOption,
  gqlIdQueryParam,
  enumQueryParam,
  SortOrder,
  dateRangeQueryParam
} from '@staff-portal/filters'

export const PAGE_SIZE = 10

export const NO_RESULTS_MESSAGE =
  'There are no talent coaching for this search criteria'

export const DEFAULT_SORT =
  TalentCoachingEngagementOrderField.TALENT_ACTIVATED_AT

export const SORT_OPTIONS: SortOption[] = [
  {
    text: 'Activation date',
    value: TalentCoachingEngagementOrderField.TALENT_ACTIVATED_AT.toLowerCase(),
    defaultSort: SortOrder.DESC
  },
  {
    text: 'Coach name',
    value: TalentCoachingEngagementOrderField.COACH_NAME.toLowerCase(),
    defaultSort: SortOrder.DESC
  },
  {
    text: 'Talent name',
    value: TalentCoachingEngagementOrderField.TALENT_NAME.toLowerCase(),
    defaultSort: SortOrder.DESC
  }
]

export const COACHING_LIST_QUERY_PARAMS_CONFIG: QueryParamsOptions = {
  coachId: gqlIdQueryParam('Staff'),
  talentId: gqlIdQueryParam('Talent'),
  talentActivatedAt: dateRangeQueryParam,
  statuses: enumQueryParam
}
