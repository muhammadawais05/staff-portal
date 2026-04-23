import { useCallback, useMemo } from 'react'
import { localStorageService } from '@staff-portal/local-storage-service'
import { NUMBER_OF_ITEMS_DISPLAY_LIMIT } from '@staff-portal/config'
import { trackEvent } from '@staff-portal/monitoring-service'
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

interface TalentListQueryParams extends QueryParams {
  page?: number
  limit?: number
}

export interface FilterValues extends QueryParams {}

const DEFAULT_SORT = {
  sort: { target: 'activated_at', order: 'desc' }
}

const checkFilterSortRequirements = (values: QueryParams): QueryParams => {
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

  return values
}

const checkFilterValuesRequirements = (values: QueryParams): QueryParams => {
  const { job_id, overlapping_hours, ...rest } = values

  if (!job_id && overlapping_hours) {
    return rest
  }

  return values
}

const checkFilterRequirements = (values: QueryParams): QueryParams =>
  checkFilterValuesRequirements(checkFilterSortRequirements(values))

const getDefaultPageLimit = () => {
  const limit = localStorageService.getItem<number | string>(
    LOCAL_STORAGE_PAGE_SIZE_KEY
  )

  if (!limit) {
    return DEFAULT_PAGE_SIZE
  }

  return parseInt(limit.toString())
}

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

  const { page, filterValues, sortOptions } = useMemo(() => {
    const { page: activePage, ...restFilters } = urlValues

    const filters: FilterParams & { limit: number } = {
      ...initialFilters,
      ...restFilters,
      limit: restFilters.limit || getDefaultPageLimit()
    }

    return {
      page: activePage,
      filterValues: filters,
      sortOptions: getSortOptions(restFilters)
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
      const parsedValues = checkFilterRequirements(values)
      const newLimit = parsedValues.limit as number

      localStorageService.setItem(LOCAL_STORAGE_PAGE_SIZE_KEY, newLimit)

      trackPageSize(newLimit, filterValues.limit, currentUser?.id)
      setUrlValues({ ...parsedValues, page: 1 })
    },
    [setUrlValues, currentUser?.id, filterValues.limit]
  )

  return {
    page,
    filterValues,
    sortOptions,
    resolvingFilters,
    handlePageChange,
    handleFilterChange
  }
}

export default useHandleTalentListFilters
