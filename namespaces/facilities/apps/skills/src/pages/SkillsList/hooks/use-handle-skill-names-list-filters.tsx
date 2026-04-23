import {
  LogicOperator,
  SkillNameBadgesFilter
} from '@staff-portal/graphql/staff'
import { QueryParamsOptions } from '@staff-portal/query-params-state'
import {
  SortOption,
  PaginationParams,
  usePagination,
  gqlIdQueryParam,
  searchBarQueryParam,
  Sort,
  SortOrder
} from '@staff-portal/filters'

import { searchBarCategories } from '../../../components'
import { PAGE_SIZE } from '../../../config'

export interface SkillNamesQueryParams extends PaginationParams {
  ancestor_skill_name_id?: string
  is_skill_identifier?: string
  editor_check?: string
  vertical_check?: string
  only_direct_child?: string
  category_ids?: string[]
  talent_statuses?: string[]
  verticals?: string[]
  badges?: SkillNameBadgesFilter
  logic?: LogicOperator
  sort?: Sort
}

const SORT_OPTIONS: SortOption[] = [
  {
    text: 'Skill',
    value: 'skill',
    defaultSort: SortOrder.ASC
  }
]

const QUERY_PARAMS_CONFIG: QueryParamsOptions = {
  badges: searchBarQueryParam(searchBarCategories),
  ancestor_skill_name_id: gqlIdQueryParam('SkillName')
}

const useHandleSkillNamesListFilters = () => {
  const {
    page,
    pagination,
    limit,
    filterValues,
    resolving,
    handlePageChange,
    handleFilterChange
  } = usePagination<SkillNamesQueryParams>({
    config: QUERY_PARAMS_CONFIG,
    limit: PAGE_SIZE
  })

  const sortOptions = SORT_OPTIONS

  return {
    page,
    pagination,
    limit,
    filterValues,
    sortOptions,
    resolving,
    handlePageChange,
    handleFilterChange
  }
}

export default useHandleSkillNamesListFilters
