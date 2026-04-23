import { useCallback, useMemo, useRef } from 'react'
import { localStorageService } from '@staff-portal/local-storage-service'
import { NUMBER_OF_ITEMS_DISPLAY_LIMIT } from '@staff-portal/config'
import { trackEvent } from '@staff-portal/monitoring-service'
import {
  SkillBadgedSearchInput,
  TalentBadgesFilter
} from '@staff-portal/graphql/staff'
import { useGetCurrentUser } from '@staff-portal/current-user'
import {
  QueryParams,
  QueryParamsOptions,
  useQueryParamsState
} from '@staff-portal/query-params-state'
import {
  searchBarQueryParam,
  dateRangeQueryParam,
  rangeQueryParam
} from '@staff-portal/filters'
import {
  searchBarCategories,
  DEFAULT_PAGE_SIZE,
  LOCAL_STORAGE_PAGE_SIZE_KEY,
  PAGE_SIZES,
  checkBestMatchQueryEnabled,
  isRelevanceQueryEnabled,
  matchBestMatchQueryConditions,
  matchRelevanceQueryConditions,
  ManagementExperienceQueryParam,
  EnterpriseExperienceQueryParam,
  AvailableHoursQueryParam,
  PageWithLimitQueryParam,
  shouldResetHideTalentsWith,
  LimitQueryParam,
  getSortOptions
} from '@staff-portal/talents-list'
import deepEqual from 'deep-equal'

interface TalentListQueryParams extends QueryParams {
  page?: number
  limit?: number
}

export interface FilterValues extends QueryParams {}

const DEFAULT_SORT = {
  sort: { target: 'activated_at', order: 'desc' }
}

const RELEVANCE_SORT = {
  sort: { target: 'relevance', order: 'desc' }
}

const checkFilterSortRequirements = (
  values: QueryParams,
  canRestoreRelevance = false
): QueryParams => {
  const isBestMatchInvalid =
    checkBestMatchQueryEnabled(values) && !matchBestMatchQueryConditions(values)

  const isRelevanceInvalid =
    isRelevanceQueryEnabled(values) && !matchRelevanceQueryConditions(values)

  if (shouldResetHideTalentsWith(values)) {
    values.hide_talents_with = undefined
  }

  if (isBestMatchInvalid || isRelevanceInvalid) {
    return { ...values, ...DEFAULT_SORT }
  }

  if (canRestoreRelevance && isRelevanceQueryEnabled(values)) {
    return { ...values, ...RELEVANCE_SORT }
  }

  return values
}

const checkFilterValuesRequirements = (values: QueryParams): QueryParams => {
  const { job_id, overlapping_hours, ...rest } = values

  if (!job_id && overlapping_hours) {
    return rest
  }

  return values
}

const checkFilterRequirements = (
  values: QueryParams,
  canRestoreRelevance = false
): QueryParams =>
  checkFilterValuesRequirements(
    checkFilterSortRequirements(values, canRestoreRelevance)
  )

const canRestoreRelevance = (
  incomingBadges: TalentBadgesFilter,
  previousBadges: TalentBadgesFilter
) => incomingBadges.skills?.length === 0 && previousBadges.skills?.length === 1

const getDefaultPageLimit = () =>
  localStorageService.getItem<number>(LOCAL_STORAGE_PAGE_SIZE_KEY) ??
  DEFAULT_PAGE_SIZE

const trackPageSize = (limit: number, limitPrev: number, userId?: string) => {
  if (limitPrev === limit) {
    return
  }

  trackEvent('talent-list-page-size', {
    userId,
    pageSize: limit
  })
}

const QUERY_PARAMS_CONFIG: QueryParamsOptions = {
  badges: searchBarQueryParam(searchBarCategories),
  applied_on: dateRangeQueryParam,
  allocated_hours_confirmed_at: dateRangeQueryParam,
  reapplication_date: dateRangeQueryParam,
  timezones: rangeQueryParam,
  hourly_rate: rangeQueryParam,
  client_hourly_rate: rangeQueryParam,
  management_experience: ManagementExperienceQueryParam,
  enterprise_experience: EnterpriseExperienceQueryParam,
  available_hours: AvailableHoursQueryParam,
  page: PageWithLimitQueryParam({
    maxItems: NUMBER_OF_ITEMS_DISPLAY_LIMIT,
    get defaultItemsPerPage() {
      return getDefaultPageLimit()
    }
  }),
  limit: LimitQueryParam({
    get defaultLimit() {
      return getDefaultPageLimit()
    },
    availableLimits: PAGE_SIZES
  })
}

interface FilterParams extends QueryParams {
  limit?: number
}
interface Props {
  initialFilters?: FilterParams
}

const useHandleTalentListFilters = ({ initialFilters }: Props = {}) => {
  const [urlValues, setUrlValues, resolvingFilters] =
    useQueryParamsState<TalentListQueryParams>(QUERY_PARAMS_CONFIG)

  const currentUser = useGetCurrentUser()

  const sortValue = useRef<{ target: string; order: string }>()

  const { page, filterValues, sortOptions, badges, selectedSkills } =
    useMemo(() => {
      const { page: activePage, ...restFilters } = urlValues
      const selectedBadges = (restFilters.badges ?? {}) as TalentBadgesFilter

      const filters: FilterParams & { limit: number } = {
        ...initialFilters,
        ...restFilters,
        limit: restFilters.limit || getDefaultPageLimit()
      }

      return {
        page: activePage,
        filterValues: filters,
        badges: selectedBadges,
        sortOptions: getSortOptions(restFilters),
        selectedSkills: selectedBadges.skills ?? []
      }
    }, [urlValues, initialFilters])

  const handlePageChange = useCallback(
    (newPage: number) =>
      setUrlValues({
        ...urlValues,
        page: newPage
      }),
    [urlValues, setUrlValues]
  )

  const handleFilterChange = useCallback(
    (values: Record<string, unknown>) => {
      const incomingBadges = values.badges as TalentBadgesFilter
      const previousBadges = filterValues.badges as TalentBadgesFilter

      const parsedValues = checkFilterRequirements(
        values,
        canRestoreRelevance(incomingBadges, previousBadges)
      )

      sortValue.current = parsedValues.sort as { target: string; order: string }

      const newLimit = parsedValues.limit as number

      localStorageService.setItem(LOCAL_STORAGE_PAGE_SIZE_KEY, newLimit)

      trackPageSize(newLimit, filterValues.limit, currentUser?.id)

      const sortAutomaticallyRestored = !deepEqual(
        values.sort,
        parsedValues.sort
      )

      if (sortAutomaticallyRestored) {
        setUrlValues({ ...parsedValues, sort: filterValues.sort, page: 1 })
      } else {
        setUrlValues({ ...parsedValues, page: 1 })
      }
    },
    [
      setUrlValues,
      currentUser?.id,
      filterValues.limit,
      filterValues.sort,
      filterValues.badges
    ]
  )

  const handleSkillSelect = useCallback(
    (skill: SkillBadgedSearchInput) =>
      handleFilterChange({
        ...filterValues,
        badges: {
          ...badges,
          skills: [...selectedSkills, skill]
        }
      }),
    [filterValues, badges, selectedSkills, handleFilterChange]
  )

  const handleSkillDeselect = useCallback(
    (skillName: string) =>
      handleFilterChange({
        ...filterValues,
        badges: {
          ...badges,
          skills: selectedSkills.filter(({ name }) => name !== skillName)
        }
      }),
    [filterValues, badges, selectedSkills, handleFilterChange]
  )

  return {
    page,
    filterValues: {
      ...filterValues,
      sort: sortValue.current ?? filterValues.sort
    },
    sortOptions,
    selectedSkills,
    resolvingFilters,
    handlePageChange,
    handleFilterChange,
    handleSkillSelect,
    handleSkillDeselect
  }
}

export default useHandleTalentListFilters
